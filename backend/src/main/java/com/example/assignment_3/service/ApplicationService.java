package com.example.assignment_3.service;

import com.example.assignment_3.dto.ApplicationDTO;
import com.example.assignment_3.dto.MinimalStudentInfoDTO;
import com.example.assignment_3.model.*;
import com.example.assignment_3.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    //student perspective
    public String applyForInternship(ApplicationDTO applicationDTO) {
        Student student = studentRepository.findById(applicationDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Internship internship = internshipRepository.findById(applicationDTO.getInternshipId())
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        if (applicationRepository.existsByStudentAndInternshipId(student, internship.getId())) {
            return "You have already applied for this internship.";
        }

        Application application = new Application();
        application.setStudent(student);
        application.setInternship(internship);
        application.setApplicationDate(LocalDateTime.now());
        application.setStatus(ApplicationStatus.PENDING);

        applicationRepository.save(application);

        return "Application submitted successfully.";
    }

    //to list all the applications of a specific student (student perspective)
    public List<Application> getApplicationsByStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return applicationRepository.findByStudent(student);
    }

    //to list details about a selected application of student (student perspective)
    public Application getApplicationById(Long applicationId) {
        return applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
    }

    //to view ALL the applications of an internship (company perspective)
    public List<Application> getApplicationsForInternship(Long internshipId) {
        // Validate if the internship exists
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        return applicationRepository.findByInternshipId(internshipId);
    }

    //to update the status of an application, by default the status is pending and the company can accept or reject the application of a student (company perspective)
    public String updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        // Fetch the application
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Update the status
        application.setStatus(status);
        applicationRepository.save(application);

        return "Application status updated successfully.";
    }

    //to view only the accepted candidates for the internship -> maps the functionality "List candidates for a role"
    public List<MinimalStudentInfoDTO> getAcceptedCandidatesForRole(Long internshipId) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        List<Application> acceptedApplications = applicationRepository.findByInternshipId(internshipId).stream()
                .filter(application -> application.getStatus() == ApplicationStatus.ACCEPTED)
                .collect(Collectors.toList());

        return acceptedApplications.stream()
                .map(application -> {
                    Student student = application.getStudent();
                    User user = student.getUser();
                    MinimalStudentInfoDTO dto = new MinimalStudentInfoDTO();
                    dto.setId(student.getId());
                    dto.setFullName(student.getFullName());
                    dto.setEmail(user.getEmail());
                    dto.setPhoneNumber(student.getPhoneNumber());
                    dto.setLocation(student.getLocation());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    //really select the candidate for a role from the ones accepted
    public MinimalStudentInfoDTO selectCandidateForInternship(Long internshipId, Long applicationId) {
        // Fetch the internship
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new RuntimeException("Internship not found"));

        // Check if the internship is already filled
        if (!internship.isActive()) {
            throw new RuntimeException("Internship has already been filled.");
        }

        // Fetch the application
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        // Ensure the application belongs to the internship
        if (!application.getInternship().getId().equals(internshipId)) {
            throw new RuntimeException("Application does not belong to this internship.");
        }

        // Ensure the application is accepted
        if (application.getStatus() != ApplicationStatus.ACCEPTED) {
            throw new RuntimeException("Only accepted candidates can be selected.");
        }

        // Mark the application as selected
        application.setTheStudentSelected(true);
        applicationRepository.save(application);

        // Mark the internship as inactive
        internship.setActive(false);
        internshipRepository.save(internship);

        // Map the selected student to StudentResponseDTO
        Student student = application.getStudent();
        MinimalStudentInfoDTO dto = new MinimalStudentInfoDTO();
        dto.setId(student.getId());
        dto.setFullName(student.getFullName());
        dto.setEmail(student.getUser().getEmail()); // Get email from the User entity
        dto.setPhoneNumber(student.getPhoneNumber());
        dto.setLocation(student.getLocation());

        return dto;
    }
}