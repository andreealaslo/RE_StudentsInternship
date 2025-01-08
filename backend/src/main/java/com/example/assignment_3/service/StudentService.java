package com.example.assignment_3.service;

import com.example.assignment_3.dto.StudentDTO;
import com.example.assignment_3.model.Student;
import com.example.assignment_3.model.University;
import com.example.assignment_3.model.User;
import com.example.assignment_3.repository.StudentRepository;
import com.example.assignment_3.repository.UniversityRepository;
import com.example.assignment_3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UniversityRepository universityRepository;

    public String createProfile(StudentDTO request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Retrieve the university
        University university = universityRepository.findById(request.getUniversityId())
                .orElseThrow(() -> new RuntimeException("University not found"));

        Student student = new Student();
        student.setUser(user);
        student.setUniversity(university);
        student.setFullName(request.getFullName());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setAge(request.getAge());
        student.setLocation(request.getLocation());
        student.setLinkedinLink(request.getLinkedinLink());
        student.setGithubLink(request.getGithubLink());
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

    public List<Student> getStudentsByUniversityId(Long universityId) {
        return studentRepository.findByUniversityId(universityId);
    }
}