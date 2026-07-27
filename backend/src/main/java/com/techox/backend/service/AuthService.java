package com.techox.backend.service;

import com.techox.backend.dto.LoginRequest;
import com.techox.backend.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}