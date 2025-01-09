package com.example.assignment_3.controller;

import com.example.assignment_3.dto.UniversityDTO;
import com.example.assignment_3.model.University;
import com.example.assignment_3.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/university")
public class UniversityController {

    @Autowired
    private UniversityService universityService;

    @PostMapping("/profile/{userId}")
    public ResponseEntity<String> createProfile(@RequestBody UniversityDTO request, @PathVariable Long userId) {
        String response = universityService.createProfile(request, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<University> getUniversityByUserId(@PathVariable Long userId) {
        University university = universityService.getUniversityByUserId(userId);
        if (university != null) {
            return ResponseEntity.ok(university);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<University>> getAllUniversities() {
        List<University> universities = universityService.getAllUniversities();
        return ResponseEntity.ok(universities);
    }
}