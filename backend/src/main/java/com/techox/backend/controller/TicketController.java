package com.techox.backend.controller;

import com.techox.backend.dto.CreateTicketRequest;
import com.techox.backend.dto.TicketResponse;
import com.techox.backend.dto.UpdateTicketRequest;
import com.techox.backend.dto.UpdateTicketStatusRequest;
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
    public ResponseEntity<TicketResponse> createTicket(
            @RequestBody CreateTicketRequest request) {

        Ticket ticket = ticketService.createTicket(request);

        TicketResponse response =
                TicketMapper.toResponse(ticket);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TicketResponse>> getAllTickets() {

        List<TicketResponse> response =
                ticketService.getAllTickets()
                        .stream()
                        .map(TicketMapper::toResponse)
                        .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(
            @PathVariable Long id) {

        Ticket ticket =
                ticketService.getTicketById(id);

        return ResponseEntity.ok(
                TicketMapper.toResponse(ticket)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(
            @PathVariable Long id,
            @RequestBody UpdateTicketRequest request) {

        Ticket updatedTicket =
                ticketService.updateTicket(id, request);

        return ResponseEntity.ok(
                TicketMapper.toResponse(updatedTicket)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TicketResponse> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusRequest request) {

        Ticket updatedTicket =
                ticketService.updateTicketStatus(id, request);

        return ResponseEntity.ok(
                TicketMapper.toResponse(updatedTicket)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable Long id) {

        ticketService.deleteTicket(id);

        return ResponseEntity.ok("Ticket deleted successfully.");
    }

}