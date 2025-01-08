package com.example.assignment_3.dto;
import lombok.Data;

import java.util.List;

@Data
public class StudentDTO {
    private String fullName;
    private String phoneNumber;
    private Integer age;
    private String location;
    private String linkedinLink;
    private String githubLink;
    private String degree;
    private String expectedGraduationDate;
    private List<String> pastExperience;
    private List<String> skills;
    private List<String> projects;
    private List<String> knownLanguages;
    private List<String> hobbies;
    private Long universityId;
}
