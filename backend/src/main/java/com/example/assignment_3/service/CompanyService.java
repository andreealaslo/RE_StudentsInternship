package com.example.assignment_3.service;

import com.example.assignment_3.dto.CompanyDTO;
import com.example.assignment_3.model.Company;
import com.example.assignment_3.model.User;
import com.example.assignment_3.repository.CompanyRepository;
import com.example.assignment_3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    public String createProfile(CompanyDTO request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Company company = new Company();
        company.setUser(user);
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setFieldOfWork(request.getFieldOfWork());
        company.setLocation(request.getLocation());
        company.setCompanySize(request.getCompanySize());
        company.setWebsiteLink(request.getWebsiteLink());

        companyRepository.save(company);
        return "Company profile created successfully.";
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyByUserId(Long id) {
        return companyRepository.findByUserId(id);
    }
}