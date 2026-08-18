package com.techox.backend.controller;


import com.techox.backend.dto.*;
import com.techox.backend.entity.Ticket;
import com.techox.backend.mapper.TicketMapper;
import com.techox.backend.service.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createTicket(
            @RequestBody CreateTicketRequest request) {

        Ticket ticket = ticketService.createTicket(request);

        TicketResponse response =
                TicketMapper.toResponse(ticket);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(
                        true,
                        "Ticket created successfully.",
                        response
                ));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllTickets() {
        System.out.println(">>> INSIDE GET ALL TICKETS");

        List<TicketResponse> response =
                ticketService.getAllTickets()
                        .stream()
                        .map(TicketMapper::toResponse)
                        .collect(Collectors.toList());

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Tickets fetched successfully.",
                        response
                )
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getTicketById(
            @PathVariable Long id) {

        Ticket ticket =
                ticketService.getTicketById(id);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Ticket fetched successfully.",
                        TicketMapper.toResponse(ticket)
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateTicket(
            @PathVariable Long id,
            @RequestBody UpdateTicketRequest request) {

        Ticket updatedTicket =
                ticketService.updateTicket(id, request);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Ticket updated successfully.",
                        TicketMapper.toResponse(updatedTicket)
                )
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusRequest request) {

        Ticket updatedTicket =
                ticketService.updateTicketStatus(id, request);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Ticket status updated successfully.",
                        TicketMapper.toResponse(updatedTicket)
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteTicket(
            @PathVariable Long id) {

        ticketService.deleteTicket(id);

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Ticket deleted successfully.",
                        null
                )
        );
    }

}