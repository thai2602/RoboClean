package com.roboclean.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TrackingEventDto {

    @NotBlank(message = "Session ID không được bỏ trống")
    private String sessionId;

    @NotBlank(message = "Event Type không được bỏ trống")
    private String eventType;

    @NotBlank(message = "Page không được bỏ trống")
    private String page;

    private String target;

    private Map<String, Object> metadata; // Received as Map and converted to JSON String
}
