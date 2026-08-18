package com.techox.backend.service;

import com.techox.backend.dto.ChangePasswordRequest;
import com.techox.backend.dto.UpdateUserRequest;
import com.techox.backend.entity.User;

import java.util.List;

public interface UserService {

    User createUser(User user);

    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, UpdateUserRequest request);

    void changePassword(
            Long id,
            ChangePasswordRequest request
    );

    void deleteUser(Long id);
}