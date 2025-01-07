package com.example.assignment_3.repository;

import com.example.assignment_3.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByUserId(Long id);
}
