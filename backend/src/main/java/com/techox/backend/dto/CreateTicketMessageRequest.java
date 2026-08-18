package com.techox.backend.dto;

public class CreateTicketMessageRequest {

    private String message;

    public CreateTicketMessageRequest() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}