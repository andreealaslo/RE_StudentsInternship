package com.example.assignment_3.controller;

import com.example.assignment_3.dto.ApplicationDTO;
import com.example.assignment_3.dto.MinimalStudentInfoDTO;
import com.example.assignment_3.model.Application;
import com.example.assignment_3.model.ApplicationStatus;
import com.example.assignment_3.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Apply for an internship
    @PostMapping("/apply")
    public ResponseEntity<String> applyForInternship(@RequestBody ApplicationDTO applicationDTO) {
        String response = applicationService.applyForInternship(applicationDTO);
        return ResponseEntity.ok(response);
    }

    // Get all applications by a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Application>> getApplicationsByStudent(@PathVariable Long studentId) {
        List<Application> applications = applicationService.getApplicationsByStudent(studentId);
        return ResponseEntity.ok(applications);
    }

    // Get application details by application ID
    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long applicationId) {
        Application application = applicationService.getApplicationById(applicationId);
        return ResponseEntity.ok(application);
    }

    //get ALL the applications of an internship
    @GetMapping("/internship/{internshipId}/all-candidates")
    public ResponseEntity<List<Application>> getApplicationsForInternship(@PathVariable Long internshipId) {
        List<Application> applications = applicationService.getApplicationsForInternship(internshipId);
        return ResponseEntity.ok(applications);
    }

    //update an application status (from the company perspective)
    @PutMapping("/{applicationId}/status")
    public ResponseEntity<String> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam ApplicationStatus status) {
        String response = applicationService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/has-applied/{studentId}/{internshipId}")
    public boolean hasAlreadyApplied(@PathVariable Long studentId, @PathVariable Long internshipId) {
        return applicationService.hasAlreadyApplied(studentId, internshipId);
    }
}
