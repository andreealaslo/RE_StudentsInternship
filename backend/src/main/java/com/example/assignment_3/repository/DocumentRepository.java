package com.example.assignment_3.repository;

import com.example.assignment_3.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByUniversityId(Long universityId);
    List<Document> findByStudentId(Long studentId);
}
