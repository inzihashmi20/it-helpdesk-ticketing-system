package com.techox.backend.dto;

import com.techox.backend.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Role role;
}