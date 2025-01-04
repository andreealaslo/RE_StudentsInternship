package com.example.assignment_3.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "Students")
@Data
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String location;

    private String linkedinLink;
    private String githubLink;

    @Column(nullable = false)
    private String currentUniversityName;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String expectedGraduationDate;

    @ElementCollection
    private List<String> pastExperience;

    @ElementCollection
    private List<String> skills;

    @ElementCollection
    private List<String> projects;

    @ElementCollection
    private List<String> knownLanguages;

    @ElementCollection
    private List<String> hobbies;
}
