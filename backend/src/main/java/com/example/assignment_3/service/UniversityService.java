package com.example.assignment_3.service;

import com.example.assignment_3.dto.UniversityDTO;
import com.example.assignment_3.model.University;
import com.example.assignment_3.model.User;
import com.example.assignment_3.repository.UniversityRepository;
import com.example.assignment_3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private UserRepository userRepository;

    public String createProfile(UniversityDTO request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        University university = new University();
        university.setUser(user);
        university.setName(request.getName());
        university.setLocation(request.getLocation());

        universityRepository.save(university);
        return "University profile created successfully.";
    }

    public University getUniversityByUserId(Long id) {
        return universityRepository.findByUserId(id);
    }

    public List<University> getAllUniversities() {
        return universityRepository.findAll();
    }

    public University getUniversityByStudentId(Long studentId) {
        return universityRepository.findByStudentId(studentId);
    }

}