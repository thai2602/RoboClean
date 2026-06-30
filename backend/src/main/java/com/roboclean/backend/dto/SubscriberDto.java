package com.roboclean.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriberDto {

    @NotBlank(message = "Họ và tên không được bỏ trống")
    private String fullName;

    @NotBlank(message = "Email không được bỏ trống")
    @Email(message = "Địa chỉ email không đúng định dạng")
    private String email;

    private String phone;
}
