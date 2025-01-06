package com.example.assignment_3.repository;

import com.example.assignment_3.model.Application;
import com.example.assignment_3.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Find all applications by student
    List<Application> findByStudent(Student student);

    // Optional: Find applications by internship
    List<Application> findByInternshipId(Long internshipId);

    //Check if a student has already applied for a specific internship
    boolean existsByStudentAndInternshipId(Student student, Long internshipId);
}
