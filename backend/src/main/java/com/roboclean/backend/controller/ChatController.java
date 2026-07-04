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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping({"/api/v1/chat", "/chat"})
public class ChatController {

    @Value("${OPENROUTER_API_KEY:}")
    private String openrouterApiKey;

    @Value("${OPENROUTER_MODEL:google/gemini-2.5-flash}")
    private String openrouterModel;

    private final ObjectMapper objectMapper = new ObjectMapper();

    // In-memory multi-turn chat history cache grouped by sessionId
    private final Map<String, List<Map<String, String>>> chatHistories = new ConcurrentHashMap<>();

    @PostMapping
    public ResponseEntity<Map<String, Object>> chat(@Valid @RequestBody ChatMessageDto chatMessageDto) {
        String botReply;

        if (openrouterApiKey == null || openrouterApiKey.trim().isEmpty()) {
            System.out.println("[Chat] OPENROUTER_API_KEY is not configured. Using fallback answers.");
            botReply = getFallbackReply(chatMessageDto.getMessage());
        } else {
            try {
                botReply = callOpenRouterApi(chatMessageDto.getSessionId(), chatMessageDto.getMessage());
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

    private String callOpenRouterApi(String sessionId, String userMessage) throws Exception {
        String systemPrompt = "Bạn là RoboClean AI Advisor - chuyên gia tư vấn bán hàng cao cấp, thông minh và thân thiện của hãng robot hút bụi RoboClean.\n"
                + "Nhiệm vụ của bạn là lắng nghe, giải đáp thắc mắc và thuyết phục khách hàng mua sản phẩm phù hợp nhất với nhu cầu của họ.\n\n"
                + "Dưới đây là thông tin chính xác về các sản phẩm và dịch vụ của RoboClean:\n"
                + "1. RoboClean Pro Max X2 (Dòng cao cấp nhất):\n"
                + "   - Giá bán: 12.990.000đ (Giá gốc: 14.990.000đ).\n"
                + "   - Thông số: Lực hút cực mạnh 6000Pa, dung lượng pin 5200mAh (hoạt động liên tục tới 180 phút, phù hợp diện tích lớn hoặc nhà nhiều tầng).\n"
                + "   - Tính năng nổi bật: Trạm sạc đa năng 6-trong-1 tự gom rác (túi chứa bụi 3L dùng 60 ngày mới cần đổ), tự giặt giẻ lau và sấy khô giẻ bằng khí nóng 55°C để chống nấm mốc và mùi hôi, tránh vật cản LiDAR AI 3D siêu nhạy.\n"
                + "2. RoboClean Standard S1 (Dòng tiêu chuẩn):\n"
                + "   - Giá bán: 7.990.000đ (Giá gốc: 9.990.000đ).\n"
                + "   - Thông số: Lực hút 4000Pa, pin 3200mAh (hoạt động liên tục 120 phút, phù hợp căn hộ vừa và nhỏ).\n"
                + "   - Tính năng nổi bật: Dock sạc cơ bản có tự động gom rác vào túi bụi 2L.\n"
                + "3. Trạm Sạc Đa Năng RoboDock (Phụ kiện nâng cấp lẻ):\n"
                + "   - Giá bán: 4.990.000đ. Dành cho khách hàng muốn nâng cấp dock sạc thường thành trạm đa năng.\n\n"
                + "ƯU ĐÃI & CHÍNH SÁCH BÁN HÀNG:\n"
                + "- Giảm thêm 10% cho đơn hàng đầu tiên khi đăng ký nhận bản tin email ở chân trang web.\n"
                + "- Miễn phí vận chuyển quốc nội.\n"
                + "- Bảo hành chính hãng 24 tháng, lỗi 1 đổi 1 trong vòng 30 ngày đầu tiên.\n\n"
                + "HƯỚNG DẪN CƯ XỬ & TRẢ LỜI:\n"
                + "- Nói chuyện tự nhiên, lịch sự, xưng hô 'Dạ, em chào anh/chị' hoặc 'RoboClean xin chào'. Sử dụng ngôn từ ấm áp, chuyên nghiệp.\n"
                + "- Khi khách hỏi về so sánh, tư vấn chọn máy: Phân tích dựa trên nhu cầu của họ (ví dụ: nhà có nuôi thú cưng, nhiều tóc rụng, nhà rộng hay nhiều tầng thì khuyên dùng Pro Max X2 nhờ lực hút mạnh 6000Pa và pin trâu; nhà nhỏ căn hộ chung cư thì Standard S1 là tiết kiệm và đủ dùng).\n"
                + "- Trả lời ngắn gọn, súc tích (dưới 4 câu), tập trung thẳng vào câu hỏi, tránh dài dòng lan man.\n"
                + "- TUYỆT ĐỐI không bịa đặt hoặc tự chế các thông số kỹ thuật (như lực hút khác, dung tích nước, các tính năng tự vẽ bản đồ 3D khác) nằm ngoài thông tin được cung cấp ở trên.";

        URL url = URI.create("https://openrouter.ai/api/v1/chat/completions").toURL();
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Authorization", "Bearer " + openrouterApiKey);
        conn.setRequestProperty("HTTP-Referer", "http://localhost:3000");
        conn.setRequestProperty("X-Title", "RoboClean Client");
        conn.setDoOutput(true);

        // Retrieve or initialize conversation history list for this session
        List<Map<String, String>> history = chatHistories.computeIfAbsent(sessionId, k -> new ArrayList<>());

        // Build standard chat completion payload: { model, messages: [ {role, content} ] }
        Map<String, Object> payload = new HashMap<>();
        payload.put("model", openrouterModel);

        List<Map<String, String>> messagesList = new ArrayList<>();
        
        // System Prompt message
        Map<String, String> systemMsg = new HashMap<>();
        systemMsg.put("role", "system");
        systemMsg.put("content", systemPrompt);
        messagesList.add(systemMsg);

        // Append historical turns
        synchronized (history) {
            messagesList.addAll(history);
        }

        // Append current user message
        Map<String, String> userMsg = new HashMap<>();
        userMsg.put("role", "user");
        userMsg.put("content", userMessage);
        messagesList.add(userMsg);

        payload.put("messages", messagesList);

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
                    String botReply = replyNode.asText().trim();
                    
                    // Save current user turn & assistant response to history
                    synchronized (history) {
                        Map<String, String> uMsg = new HashMap<>();
                        uMsg.put("role", "user");
                        uMsg.put("content", userMessage);
                        
                        Map<String, String> aMsg = new HashMap<>();
                        aMsg.put("role", "assistant");
                        aMsg.put("content", botReply);
                        
                        history.add(uMsg);
                        history.add(aMsg);
                        
                        // Limit history queue size to 16 items (8 turns) to save token context
                        if (history.size() > 16) {
                            history.subList(0, history.size() - 16).clear();
                        }
                    }
                    
                    return botReply;
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
