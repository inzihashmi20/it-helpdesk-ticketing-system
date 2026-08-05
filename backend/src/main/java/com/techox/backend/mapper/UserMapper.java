package com.techox.backend.mapper;

import com.techox.backend.dto.UserResponse;
import com.techox.backend.entity.User;

public class UserMapper {

    public static UserResponse toResponse(User user) {

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );
    }
}