package com.example.assignment_3.service;
import com.example.assignment_3.dto.UniversityDTO;
import com.example.assignment_3.model.University;
import com.example.assignment_3.model.User;
import com.example.assignment_3.repository.UniversityRepository;
import com.example.assignment_3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


}
