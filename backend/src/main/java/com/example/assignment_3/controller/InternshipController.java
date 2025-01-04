package com.example.assignment_3.controller;

import com.example.assignment_3.dto.InternshipDTO;
import com.example.assignment_3.model.Internship;
import com.example.assignment_3.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable Long id) {
        Internship internship = internshipService.getInternshipById(id);
        return ResponseEntity.ok(internship);
    }

    @PostMapping("/")
    public ResponseEntity<String> createInternship(@RequestBody InternshipDTO internshipDTO) {
        String response = internshipService.createInternship(internshipDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/")
    public ResponseEntity<List<Internship>> getAllInternships() {
        List<Internship> internships = internshipService.getAllInternships();
        return ResponseEntity.ok(internships);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Internship>> searchInternships(@RequestParam String searchTerm) {
        List<Internship> internships = internshipService.searchInternships(searchTerm);
        return ResponseEntity.ok(internships);
    }
}