package com.example.assignment_3.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Companies")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private String fieldOfWork;

    @Column(nullable = false)
    private String location;

    private String companySize;
    private String websiteLink;
}
