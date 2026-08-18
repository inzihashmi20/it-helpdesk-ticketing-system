package com.techox.backend.service.impl;

import com.techox.backend.dto.CreateTicketMessageRequest;
import com.techox.backend.dto.CreateTicketRequest;
import com.techox.backend.dto.UpdateTicketRequest;
import com.techox.backend.dto.UpdateTicketStatusRequest;
import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.User;
import com.techox.backend.enums.Role;
import com.techox.backend.enums.TicketStatus;
import com.techox.backend.repository.TicketMessageRepository;
import com.techox.backend.repository.TicketRepository;
import com.techox.backend.repository.UserRepository;
import com.techox.backend.service.TicketMessageService;
import com.techox.backend.service.TicketService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {

    private static final int MAX_DESCRIPTION_WORDS = 200;

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final TicketMessageService ticketMessageService;
    private final TicketMessageRepository ticketMessageRepository;

    public TicketServiceImpl(
            TicketRepository ticketRepository,
            UserRepository userRepository,
            TicketMessageService ticketMessageService,
            TicketMessageRepository ticketMessageRepository) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.ticketMessageService = ticketMessageService;
        this.ticketMessageRepository = ticketMessageRepository;
    }


    // =========================================================
    // GET CURRENT USER
    // =========================================================

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }


    // =========================================================
    // DESCRIPTION VALIDATION
    // =========================================================

    private void validateDescription(String description) {

        if (description == null || description.isBlank()) {
            throw new RuntimeException(
                    "Ticket description is required.");
        }

        int wordCount = description
                .trim()
                .split("\\s+")
                .length;

        if (wordCount > MAX_DESCRIPTION_WORDS) {
            throw new RuntimeException(
                    "Ticket description must not exceed "
                            + MAX_DESCRIPTION_WORDS
                            + " words.");
        }
    }


    // =========================================================
    // GET ALL TICKETS
    // =========================================================

    @Override
    public List<Ticket> getAllTickets() {

        User currentUser = getCurrentUser();

        // Admin can see all tickets
        if (currentUser.getRole() == Role.ADMIN) {
            return ticketRepository.findAll();
        }

        // Employee can only see their own tickets
        return ticketRepository.findByUser(currentUser);
    }


    // =========================================================
    // CREATE TICKET
    // =========================================================

    @Override
    public Ticket createTicket(CreateTicketRequest request) {

        User currentUser = getCurrentUser();

        // Validate description before saving
        validateDescription(request.getDescription());

        Ticket ticket = new Ticket();

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority());

        ticket.setStatus(TicketStatus.OPEN);

        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        ticket.setUser(currentUser);

        return ticketRepository.save(ticket);
    }


    // =========================================================
    // GET TICKET BY ID
    // =========================================================

    @Override
    public Ticket getTicketById(Long id) {

        return getAccessibleTicket(id);
    }


    // =========================================================
    // UPDATE TICKET DETAILS
    // =========================================================

    @Override
    public Ticket updateTicket(
            Long id,
            UpdateTicketRequest request) {

        Ticket ticket = getAccessibleTicket(id);

        // Validate description before updating
        validateDescription(request.getDescription());

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority());

        ticket.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }


    // =========================================================
    // UPDATE TICKET STATUS
    // =========================================================

    @Override
    public Ticket updateTicketStatus(
            Long id,
            UpdateTicketStatusRequest request) {

        User currentUser = getCurrentUser();

        // Only ADMIN can change ticket status
        if (currentUser.getRole() != Role.ADMIN) {

            throw new RuntimeException(
                    "Only admin can update ticket status.");
        }

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        TicketStatus oldStatus = ticket.getStatus();
        TicketStatus newStatus = request.getStatus();

        System.out.println("========== STATUS UPDATE ==========");
        System.out.println("Ticket ID = " + id);
        System.out.println("Old Status = " + oldStatus);
        System.out.println("New Status = " + newStatus);
        System.out.println("Current User = " + currentUser.getEmail());
        System.out.println("Current Role = " + currentUser.getRole());

        // Nothing to do if status hasn't changed
        if (oldStatus == newStatus) {
            return ticket;
        }

        // Update status
        ticket.setStatus(newStatus);
        ticket.setUpdatedAt(LocalDateTime.now());

        Ticket updatedTicket =
                ticketRepository.save(ticket);

        // =====================================================
        // AUTOMATIC EMPLOYEE MESSAGE
        // =====================================================

        String message = null;

        if (newStatus == TicketStatus.IN_PROGRESS) {

            System.out.println(">>> IN_PROGRESS MESSAGE TRIGGERED");

            message =
                    "Your ticket is currently under process. " +
                            "Our IT team is working on the issue.";

        } else if (newStatus == TicketStatus.CLOSED) {

            System.out.println(">>> CLOSED MESSAGE TRIGGERED");

            message =
                    "Your ticket has been resolved and closed. " +
                            "If you are still experiencing the issue, " +
                            "please contact the IT team.";
        }

        // Create automatic message
        if (message != null) {

            CreateTicketMessageRequest messageRequest =
                    new CreateTicketMessageRequest();

            messageRequest.setMessage(message);

            System.out.println(
                    ">>> CALLING TICKET MESSAGE SERVICE");

            ticketMessageService.createMessage(
                    id,
                    messageRequest
            );
        }

        return updatedTicket;
    }


    // =========================================================
    // DELETE TICKET
    // =========================================================

    @Override
    @Transactional
    public void deleteTicket(Long id) {

        Ticket ticket = getAccessibleTicket(id);

        System.out.println("========== DELETE TICKET ==========");
        System.out.println("Ticket ID = " + id);

        // Delete all messages associated with this ticket first
        ticketMessageRepository.deleteByTicket(ticket);

        System.out.println(">>> Ticket messages deleted");

        // Now delete the ticket
        ticketRepository.delete(ticket);

        System.out.println(">>> Ticket deleted successfully");
    }


    // =========================================================
    // ACCESS CONTROL
    // =========================================================

    private Ticket getAccessibleTicket(Long id) {

        User currentUser = getCurrentUser();

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        // Admin can access every ticket
        if (currentUser.getRole() == Role.ADMIN) {
            return ticket;
        }

        // Employee can only access their own ticket
        if (ticket.getUser().getId()
                .equals(currentUser.getId())) {

            return ticket;
        }

        throw new RuntimeException(
                "You are not authorized to access this ticket.");
    }
}