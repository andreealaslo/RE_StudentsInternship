package com.example.assignment_3.service;

import com.example.assignment_3.dto.RegisterRequest;
import com.example.assignment_3.model.User;
import com.example.assignment_3.model.UserType;
import com.example.assignment_3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;


    public String register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return "Email already exists.";
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setUserType(UserType.valueOf(request.getUserType()));

        userRepository.save(user);

        return user.getId().toString();
    }

    public String login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return "User not found.";
        }

        User user = userOptional.get();
        if (!user.getPassword().equals(password)) {
            return "Invalid credentials.";
        }

        return user.getName();
    }
}

