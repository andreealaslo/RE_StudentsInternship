package com.example.assignment_3.service;

import com.example.assignment_3.dto.InternshipDTO;
import com.example.assignment_3.model.Company;
import com.example.assignment_3.model.Internship;
import com.example.assignment_3.repository.CompanyRepository;
import com.example.assignment_3.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private CompanyRepository companyRepository;

    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Internship not found"));
    }

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public String createInternship(InternshipDTO internshipDTO) {
        Company company = companyRepository.findById(internshipDTO.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Internship internship = new Internship();
        internship.setCompany(company);
        internship.setTitle(internshipDTO.getTitle());
        internship.setDescription(internshipDTO.getDescription());
        internship.setLocation(internshipDTO.getLocation());
        internship.setDuration(internshipDTO.getDuration());
        internship.setRequirements(internshipDTO.getRequirements());

        internshipRepository.save(internship);
        return "Internship created successfully.";
    }

    public List<Internship> searchInternships(String searchTerm) {
        return internshipRepository.searchInternshipsByNameOrCompany(searchTerm);
    }

    public void deleteInternship(Long internshipId) {
        internshipRepository.deleteById(internshipId);
    }

    public List<Internship> getInternshipsByCompanyId(Long companyId) {
        return internshipRepository.findByCompanyId(companyId);
    }

    public String updateInternship(Long id, InternshipDTO internshipDTO) {
        Internship internship = getInternshipById(id);
        internship.setTitle(internshipDTO.getTitle());
        internship.setDescription(internshipDTO.getDescription());
        internship.setLocation(internshipDTO.getLocation());
        internship.setDuration(internshipDTO.getDuration());
        internship.setRequirements(internshipDTO.getRequirements());
        internshipRepository.save(internship);
        return "Internship updated successfully.";
    }
}
