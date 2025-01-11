package com.example.assignment_3.dto;

import lombok.Data;

@Data
public class DocumentDTO {
    private Long id;
    private Long studentId;
    private Long universityId;
    private String fileName;
    private String fileType;
    private long fileSize;
    private String filePath;
}
