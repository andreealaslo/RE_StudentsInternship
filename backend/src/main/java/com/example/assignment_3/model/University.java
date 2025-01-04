package com.example.assignment_3.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Universities")
@Data
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;
}
