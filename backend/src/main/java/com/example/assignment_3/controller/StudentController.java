package com.example.assignment_3.controller;

import com.example.assignment_3.dto.StudentDTO;
import com.example.assignment_3.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/profile/{userId}")
    public ResponseEntity<String> createProfile(@RequestBody StudentDTO request, @PathVariable Long userId) {
        String response = studentService.createProfile(request, userId);
        return ResponseEntity.ok(response);
    }
}