package com.roboclean.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDto {

    @NotBlank(message = "Session ID không được bỏ trống")
    private String sessionId;

    @NotBlank(message = "Tin nhắn không được bỏ trống")
    private String message;
}
