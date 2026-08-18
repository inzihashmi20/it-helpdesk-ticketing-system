package com.techox.backend.dto;

import java.time.LocalDateTime;

public class TicketMessageResponse {

    private Long id;
    private String message;

    private Long userId;
    private String userName;
    private String userRole;

    private LocalDateTime createdAt;

    public TicketMessageResponse(
            Long id,
            String message,
            Long userId,
            String userName,
            String userRole,
            LocalDateTime createdAt) {

        this.id = id;
        this.message = message;
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}