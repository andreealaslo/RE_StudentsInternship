package com.example.assignment_3.service;

import com.example.assignment_3.dto.StudentDTO;
import com.example.assignment_3.model.Student;
import com.example.assignment_3.model.User;
import com.example.assignment_3.repository.StudentRepository;
import com.example.assignment_3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;


    public String createProfile(StudentDTO request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = new Student();
        student.setUser(user);
        student.setFullName(request.getFullName());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setAge(request.getAge());
        student.setLocation(request.getLocation());
        student.setLinkedinLink(request.getLinkedinLink());
        student.setGithubLink(request.getGithubLink());
        student.setCurrentUniversityName(request.getCurrentUniversityName());
        student.setDegree(request.getDegree());
        student.setExpectedGraduationDate(request.getExpectedGraduationDate());
        student.setPastExperience(request.getPastExperience());
        student.setSkills(request.getSkills());
        student.setProjects(request.getProjects());
        student.setKnownLanguages(request.getKnownLanguages());
        student.setHobbies(request.getHobbies());

        studentRepository.save(student);
        return "Student profile created successfully.";
    }
}