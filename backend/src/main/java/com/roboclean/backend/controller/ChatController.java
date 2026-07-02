package com.roboclean.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.roboclean.backend.dto.ChatMessageDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Value("${OPENROUTER_API_KEY:}")
    private String openrouterApiKey;

    @Value("${OPENROUTER_MODEL:google/gemini-2.5-flash}")
    private String openrouterModel;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<Map<String, Object>> chat(@Valid @RequestBody ChatMessageDto chatMessageDto) {
        String botReply;

        if (openrouterApiKey == null || openrouterApiKey.trim().isEmpty()) {
            System.out.println("[Chat] OPENROUTER_API_KEY is not configured. Using fallback answers.");
            botReply = getFallbackReply(chatMessageDto.getMessage());
        } else {
            try {
                botReply = callOpenRouterApi(chatMessageDto.getMessage());
            } catch (Exception e) {
                System.err.println("[Chat] Failed calling OpenRouter API: " + e.getMessage());
                botReply = getFallbackReply(chatMessageDto.getMessage());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        
        Map<String, Object> data = new HashMap<>();
        data.put("reply", botReply);
        response.put("data", data);

        return ResponseEntity.ok(response);
    }

    private String callOpenRouterApi(String userMessage) throws Exception {
        String systemPrompt = "Bạn là trợ lý ảo tư vấn bán hàng của hãng RoboClean. "
                + "Trả lời ngắn gọn, thân thiện, lịch sự bằng Tiếng Việt dựa trên các thông tin sau:\n"
                + "- RoboClean Pro Max X2: Giá 12.990.000đ (Gốc 14.990.000đ), lực hút 6000Pa, pin 5200mAh (dùng 180 phút), trạm sạc đa năng tự làm sạch, tự đổ rác túi 3L, giặt sấy giẻ khí nóng 55°C.\n"
                + "- RoboClean Standard S1: Giá 7.990.000đ (Gốc 9.990.000đ), lực hút 4000Pa, pin 3200mAh (dùng 120 phút), dock sạc cơ bản tự gom rác túi 2L.\n"
                + "- Trạm Sạc RoboDock (bán lẻ phụ kiện nâng cấp): Giá 4.990.000đ.\n"
                + "- Ưu đãi: Đăng ký email nhận mã giảm giá 10% cho đơn hàng đầu tiên.\n"
                + "- Chính sách: Bảo hành 24 tháng chính hãng, lỗi 1 đổi 1 trong 30 ngày, miễn phí giao hàng toàn quốc.\n"
                + "Hãy trả lời câu hỏi sau của khách hàng dưới 3 câu ngắn gọn. Đừng bịa đặt thông số nằm ngoài mô tả ở trên.";

        URL url = URI.create("https://openrouter.ai/api/v1/chat/completions").toURL();
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + openrouterApiKey);
        conn.setRequestProperty("HTTP-Referer", "http://localhost:3000");
        conn.setRequestProperty("X-Title", "RoboClean Client");
        conn.setDoOutput(true);

        // Build standard chat completion payload: { model, messages: [ {role, content} ] }
        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openrouterModel);

        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", systemPrompt);

        Map<String, String> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", userMessage);

        payload.put("messages", new Object[]{systemMsg, userMsg});

        String jsonPayload = objectMapper.writeValueAsString(payload);

        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonPayload.getBytes(StandardCharsets.UTF_8);
            os.write(input, 0, input.length);
        }

        int code = conn.getResponseCode();
        if (code == 200) {
            try (InputStream is = conn.getInputStream()) {
                JsonNode rootNode = objectMapper.readTree(is);
                JsonNode replyNode = rootNode
                        .path("choices")
                        .path(0)
                        .path("message")
                        .path("content");
                
                if (!replyNode.isMissingNode()) {
                    return replyNode.asText().trim();
                }
            }
        } else {
            System.err.println("[Chat] OpenRouter API returned error code: " + code);
        }

        throw new RuntimeException("Empty response or OpenRouter API failure");
    }

    private String getFallbackReply(String userMessage) {
        String msg = userMessage.toLowerCase();
        if (msg.contains("giá") || msg.contains("bao nhiêu") || msg.contains("tiền")) {
            return "RoboClean Pro Max X2 có giá ưu đãi là 12.990.000đ (gốc 14.990.000đ), còn bản Standard S1 có giá là 7.990.000đ ạ. Ngoài ra đăng ký email bạn sẽ được giảm thêm 10% đơn hàng đầu tiên đấy!";
        }
        if (msg.contains("giặt") || msg.contains("sấy") || msg.contains("lau")) {
            return "Phiên bản RoboClean Pro hỗ trợ tự động giặt giẻ và sấy khô bằng khí nóng 55°C giúp giẻ luôn khô ráo, không bị nấm mốc hay mùi hôi ạ.";
        }
        if (msg.contains("bảo hành") || msg.contains("sửa")) {
            return "Sản phẩm RoboClean được bảo hành chính hãng 24 tháng toàn quốc, hỗ trợ 1 đổi 1 trong vòng 30 ngày nếu có lỗi sản xuất ạ.";
        }
        return "Chào bạn! Hiện tại kết nối AI đang bận. Tuy nhiên, bạn có thể tham khảo mẫu RoboClean Pro Max lực hút 6000Pa tự làm sạch giẻ đang bán chạy nhất với giá 12.990.000đ. Bạn cần tôi tư vấn thêm gì không ạ?";
    }
}
