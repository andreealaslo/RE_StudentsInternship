package com.example.assignment_3.controller;

import com.example.assignment_3.dto.UniversityDTO;
import com.example.assignment_3.service.UniversityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}