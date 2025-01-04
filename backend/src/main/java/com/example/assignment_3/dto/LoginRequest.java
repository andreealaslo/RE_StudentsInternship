package com.example.assignment_3.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}