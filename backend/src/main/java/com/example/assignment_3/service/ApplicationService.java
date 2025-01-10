package com.example.assignment_3.service;

import com.example.assignment_3.dto.ApplicationDTO;
import com.example.assignment_3.model.*;
import com.example.assignment_3.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


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

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        Internship internship = application.getInternship();

        if (!internship.isActive()) {
            throw new RuntimeException("Internship is no longer active.");
        }

        if (status == ApplicationStatus.ACCEPTED) {

            if (application.getStatus() != ApplicationStatus.PENDING) {
                throw new RuntimeException("Only pending applications can be accepted.");
            }

            if (internship.getRemainingSlots() <= 0) {
                throw new RuntimeException("No remaining slots available for this internship.");
            }

            application.setStatus(ApplicationStatus.ACCEPTED);
            application.setTheStudentSelected(true);
            applicationRepository.save(application);

            internship.setRemainingSlots(internship.getRemainingSlots() - 1);


            if (internship.getRemainingSlots() <= 0) {
                internship.setActive(false);
            }
            internshipRepository.save(internship);

            return "Application accepted successfully.";
        } else if (status == ApplicationStatus.REJECTED) {

            application.setStatus(ApplicationStatus.REJECTED);
            application.setTheStudentSelected(false);
            applicationRepository.save(application);
            return "Application rejected successfully.";
        } else {
            throw new RuntimeException("Invalid status update.");
        }
    }
}