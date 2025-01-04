package com.example.assignment_3.repository;

import com.example.assignment_3.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Long> {
    @Query("SELECT i FROM Internship i WHERE " +
            "LOWER(i.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(i.company.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Internship> searchInternshipsByNameOrCompany(String searchTerm);
}