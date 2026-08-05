package com.techox.backend.controller;

import com.techox.backend.dto.ApiResponse;
import com.techox.backend.dto.CreateUserRequest;
import com.techox.backend.dto.UserResponse;
import com.techox.backend.entity.User;
import com.techox.backend.mapper.UserMapper;
import com.techox.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        User savedUser = userService.createUser(user);

        ApiResponse<UserResponse> response = new ApiResponse<>(
                true,
                "User created successfully.",
                UserMapper.toResponse(savedUser)
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}