package com.example.assignment_3.repository;

import com.example.assignment_3.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {
    University findByUserId(Long id);

    @Query("SELECT u FROM University u JOIN Student s ON s.university.id = u.id WHERE s.id = :studentId")
    University findByStudentId(@Param("studentId") Long studentId);
}