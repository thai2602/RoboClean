package com.roboclean.backend.controller;

import com.roboclean.backend.dto.SubscriberDto;
import com.roboclean.backend.entity.Subscriber;
import com.roboclean.backend.repository.SubscriberRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/v1/subscribers")
public class SubscriberController {

    @Autowired
    private SubscriberRepository subscriberRepository;

    @Value("${TRACKING_WEBHOOK_URL:}")
    private String webhookUrl;

    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    @PostMapping
    public ResponseEntity<Map<String, Object>> subscribe(@Valid @RequestBody SubscriberDto subscriberDto) {
        // Check for duplicates
        if (subscriberRepository.findByEmail(subscriberDto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email này đã được đăng ký nhận ưu đãi trước đó.");
        }

        Subscriber subscriber = Subscriber.builder()
                .fullName(subscriberDto.getFullName())
                .email(subscriberDto.getEmail())
                .phone(subscriberDto.getPhone())
                .status("ACTIVE")
                .build();

        Subscriber saved = subscriberRepository.save(subscriber);

        // Async Webhook trigger
        if (webhookUrl != null && !webhookUrl.isEmpty()) {
            triggerWebhookAsync(saved);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Đăng ký nhận tin thành công!");
        
        Map<String, Object> data = new HashMap<>();
        data.put("id", saved.getId());
        data.put("status", saved.getStatus());
        response.put("data", data);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    private void triggerWebhookAsync(Subscriber subscriber) {
        executorService.submit(() -> {
            try {
                URL url = URI.create(webhookUrl).toURL();
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);

                String jsonPayload = String.format(
                        "{\"eventType\":\"SUBSCRIBE\",\"subscriberId\":\"%s\",\"fullName\":\"%s\",\"email\":\"%s\",\"phone\":\"%s\",\"timestamp\":\"%s\"}",
                        subscriber.getId(),
                        subscriber.getFullName(),
                        subscriber.getEmail(),
                        subscriber.getPhone() != null ? subscriber.getPhone() : "",
                        subscriber.getCreatedAt().toString()
                );

                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = jsonPayload.getBytes(StandardCharsets.UTF_8);
                    os.write(input, 0, input.length);
                }

                int code = conn.getResponseCode();
                System.out.println("[Webhook] Subscriber webhook dispatched, response code: " + code);
            } catch (Exception e) {
                System.err.println("[Webhook] Failed to dispatch subscriber webhook: " + e.getMessage());
            }
        });
    }
}
