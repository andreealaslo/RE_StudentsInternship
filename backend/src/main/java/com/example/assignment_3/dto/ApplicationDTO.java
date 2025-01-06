package com.example.assignment_3.dto;

import com.example.assignment_3.model.ApplicationStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ApplicationDTO {
    private Long id;
    private Long studentId;
    private Long internshipId;
    private LocalDateTime applicationDate;
    private ApplicationStatus status;

}