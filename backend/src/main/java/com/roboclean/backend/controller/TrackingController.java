package com.roboclean.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.roboclean.backend.dto.TrackingEventDto;
import com.roboclean.backend.entity.TrackingEvent;
import com.roboclean.backend.repository.TrackingEventRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
@RequestMapping({"/api/v1/tracking/events", "/tracking/events"})
public class TrackingController {

    @Autowired
    private TrackingEventRepository trackingEventRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${TRACKING_WEBHOOK_URL:}")
    private String webhookUrl;

    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    @PostMapping
    public ResponseEntity<Map<String, Object>> trackEvent(@Valid @RequestBody TrackingEventDto dto) {
        String metadataString = "{}";
        try {
            if (dto.getMetadata() != null) {
                metadataString = objectMapper.writeValueAsString(dto.getMetadata());
            }
        } catch (Exception e) {
            // keep empty
        }

        TrackingEvent event = TrackingEvent.builder()
                .sessionId(dto.getSessionId())
                .eventType(dto.getEventType())
                .page(dto.getPage())
                .target(dto.getTarget() != null ? dto.getTarget() : "")
                .metadata(metadataString)
                .build();

        TrackingEvent saved = trackingEventRepository.save(event);

        // Async Webhook trigger
        if (webhookUrl != null && !webhookUrl.isEmpty()) {
            triggerWebhookAsync(saved);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Tracking event recorded successfully");

        return ResponseEntity.ok(response);
    }

    private void triggerWebhookAsync(TrackingEvent event) {
        executorService.submit(() -> {
            try {
                URL url = URI.create(webhookUrl).toURL();
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);

                String jsonPayload = String.format(
                        "{\"eventType\":\"TRACKING\",\"eventId\":\"%s\",\"sessionId\":\"%s\",\"trackingType\":\"%s\",\"page\":\"%s\",\"target\":\"%s\",\"metadata\":%s,\"timestamp\":\"%s\"}",
                        event.getId(),
                        event.getSessionId(),
                        event.getEventType(),
                        event.getPage(),
                        event.getTarget(),
                        event.getMetadata(),
                        event.getCreatedAt().toString()
                );

                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = jsonPayload.getBytes(StandardCharsets.UTF_8);
                    os.write(input, 0, input.length);
                }

                int code = conn.getResponseCode();
                System.out.println("[Webhook] Tracking webhook dispatched, response code: " + code);
            } catch (Exception e) {
                System.err.println("[Webhook] Failed to dispatch tracking webhook: " + e.getMessage());
            }
        });
    }
}
