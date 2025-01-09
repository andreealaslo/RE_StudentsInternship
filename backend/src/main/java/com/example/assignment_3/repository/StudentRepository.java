package com.example.assignment_3.repository;

import com.example.assignment_3.model.Student;
import com.example.assignment_3.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUserId(Long id);
    List<Student> findByUniversityId(Long universityId); // Query to fetch students by university
}
