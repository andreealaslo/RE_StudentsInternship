package com.example.assignment_3.dto;

import lombok.Data;

@Data
public class InternshipDTO {
    private Long companyId;
    private String title;
    private String description;
    private String location;
    private String duration;
    private String requirements;
    private int remainingSlots;
}