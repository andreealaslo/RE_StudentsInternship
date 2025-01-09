package com.example.assignment_3.repository;

import com.example.assignment_3.model.Company;
import com.example.assignment_3.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
    University findByUserId(Long id);
}