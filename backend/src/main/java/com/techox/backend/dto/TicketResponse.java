package com.techox.backend.dto;

import com.techox.backend.enums.Priority;
import com.techox.backend.enums.TicketStatus;

import java.time.LocalDateTime;

public class TicketResponse {

    private Long id;

    private String title;

    private String description;

    private Priority priority;

    private TicketStatus status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private UserResponse user;

    public TicketResponse() {
    }

    public TicketResponse(Long id,
                          String title,
                          String description,
                          Priority priority,
                          TicketStatus status,
                          LocalDateTime createdAt,
                          LocalDateTime updatedAt,
                          UserResponse user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserResponse getUser() {
        return user;
    }

    public void setUser(UserResponse user) {
        this.user = user;
    }
}