package com.techox.backend.controller;

import com.techox.backend.dto.ApiResponse;
import com.techox.backend.dto.CreateTicketMessageRequest;
import com.techox.backend.dto.TicketMessageResponse;
import com.techox.backend.entity.TicketMessage;
import com.techox.backend.service.TicketMessageService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
public class TicketMessageController {

    private final TicketMessageService ticketMessageService;

    public TicketMessageController(
            TicketMessageService ticketMessageService) {

        this.ticketMessageService = ticketMessageService;
    }

    @GetMapping("/{ticketId}/messages")
    public ResponseEntity<ApiResponse> getMessages(
            @PathVariable Long ticketId) {

        List<TicketMessageResponse> response =
                ticketMessageService.getMessages(ticketId)
                        .stream()
                        .map(this::toResponse)
                        .collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Ticket messages fetched successfully.",
                        response
                )
        );
    }

    @PostMapping("/{ticketId}/messages")
    public ResponseEntity<ApiResponse> createMessage(
            @PathVariable Long ticketId,
            @RequestBody CreateTicketMessageRequest request) {

        TicketMessage message =
                ticketMessageService.createMessage(
                        ticketId,
                        request
                );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        new ApiResponse(
                                true,
                                "Ticket update sent successfully.",
                                toResponse(message)
                        )
                );
    }

    private TicketMessageResponse toResponse(
            TicketMessage message) {

        String userName =
                message.getUser().getFirstName()
                        + " "
                        + message.getUser().getLastName();

        return new TicketMessageResponse(
                message.getId(),
                message.getMessage(),
                message.getUser().getId(),
                userName,
                message.getUser().getRole().name(),
                message.getCreatedAt()
        );
    }
}