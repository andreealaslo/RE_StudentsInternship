package com.example.assignment_3.dto;

import lombok.Data;

@Data
public class MinimalStudentInfoDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String location;
}