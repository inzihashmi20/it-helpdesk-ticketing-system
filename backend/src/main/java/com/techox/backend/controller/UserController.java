package com.techox.backend.controller;

import com.techox.backend.dto.*;
import com.techox.backend.entity.User;
import com.techox.backend.mapper.UserMapper;
import com.techox.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    // =========================================================
    // CREATE USER
    // =========================================================

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody CreateUserRequest request) {

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        User savedUser =
                userService.createUser(user);

        ApiResponse<UserResponse> response =
                new ApiResponse<>(
                        true,
                        "User created successfully.",
                        UserMapper.toResponse(savedUser)
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =========================================================
    // GET ALL USERS
    // =========================================================

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {

        List<UserResponse> users =
                userService.getAllUsers()
                        .stream()
                        .map(UserMapper::toResponse)
                        .toList();

        return ResponseEntity.ok(users);
    }


    // =========================================================
    // GET USER BY ID
    // =========================================================

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id) {

        User user =
                userService.getUserById(id);

        return ResponseEntity.ok(
                UserMapper.toResponse(user)
        );
    }


    // =========================================================
    // UPDATE USER PROFILE
    // =========================================================

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {

        User updatedUser =
                userService.updateUser(id, request);

        return ResponseEntity.ok(
                UserMapper.toResponse(updatedUser)
        );
    }


    // =========================================================
    // CHANGE PASSWORD
    // =========================================================

    @PutMapping("/{id}/password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long id,
            @Valid @RequestBody ChangePasswordRequest request) {

        userService.changePassword(
                id,
                request
        );

        return ResponseEntity.ok(
                "Password changed successfully."
        );
    }


    // =========================================================
    // DELETE USER
    // =========================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                "User deleted successfully."
        );
    }
}