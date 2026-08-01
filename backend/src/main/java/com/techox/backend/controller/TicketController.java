package com.techox.backend.controller;

import com.techox.backend.dto.CreateTicketRequest;
import com.techox.backend.dto.UpdateTicketRequest;
import com.techox.backend.dto.UpdateTicketStatusRequest;
import com.techox.backend.entity.Ticket;
import com.techox.backend.service.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(
            @RequestBody CreateTicketRequest request) {
        System.out.println("========== TicketController HIT ==========");

        Ticket ticket = ticketService.createTicket(request);

        return new ResponseEntity<>(ticket, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {

        List<Ticket> tickets = ticketService.getAllTickets();

        return ResponseEntity.ok(tickets);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(
            @PathVariable Long id) {

        Ticket ticket = ticketService.getTicketById(id);

        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable Long id,
            @RequestBody UpdateTicketRequest request) {

        Ticket updatedTicket = ticketService.updateTicket(id, request);

        return ResponseEntity.ok(updatedTicket);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Ticket> updateTicketStatus(
            @PathVariable Long id,
            @RequestBody UpdateTicketStatusRequest request) {

        Ticket updatedTicket =
                ticketService.updateTicketStatus(id, request);

        return ResponseEntity.ok(updatedTicket);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(
            @PathVariable Long id) {

        ticketService.deleteTicket(id);

        return ResponseEntity.ok("Ticket deleted successfully.");
    }

}