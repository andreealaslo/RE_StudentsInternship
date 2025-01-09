package com.example.assignment_3.controller;

import com.example.assignment_3.dto.CompanyDTO;
import com.example.assignment_3.model.Company;
import com.example.assignment_3.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/profile/{userId}")
    public ResponseEntity<String> createProfile(@RequestBody CompanyDTO request, @PathVariable Long userId) {
        String response = companyService.createProfile(request, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Company>> getCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Company> getCompanyByUserId(@PathVariable Long userId) {
        Company company = companyService.getCompanyByUserId(userId);
        if (company != null) {
            return ResponseEntity.ok(company);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}