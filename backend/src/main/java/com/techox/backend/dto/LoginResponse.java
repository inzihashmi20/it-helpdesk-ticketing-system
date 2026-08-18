package com.techox.backend.dto;

import com.techox.backend.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Role role;

    private String token;

}