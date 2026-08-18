package com.techox.backend.service.impl;

import com.techox.backend.dto.CreateTicketMessageRequest;
import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.TicketMessage;
import com.techox.backend.entity.User;
import com.techox.backend.enums.Role;
import com.techox.backend.repository.TicketMessageRepository;
import com.techox.backend.repository.TicketRepository;
import com.techox.backend.repository.UserRepository;
import com.techox.backend.service.TicketMessageService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketMessageServiceImpl implements TicketMessageService {

    private final TicketMessageRepository ticketMessageRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketMessageServiceImpl(
            TicketMessageRepository ticketMessageRepository,
            TicketRepository ticketRepository,
            UserRepository userRepository) {

        this.ticketMessageRepository = ticketMessageRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    private Ticket getAccessibleTicket(Long ticketId) {

        User currentUser = getCurrentUser();

        Ticket ticket = ticketRepository.findById(ticketId)
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

    @Override
    public List<TicketMessage> getMessages(Long ticketId) {

        Ticket ticket = getAccessibleTicket(ticketId);

        return ticketMessageRepository
                .findByTicketOrderByCreatedAtAsc(ticket);
    }

    @Override
    public TicketMessage createMessage(
            Long ticketId,
            CreateTicketMessageRequest request) {

        User currentUser = getCurrentUser();

        // Only admin can create ticket messages
        if (currentUser.getRole() != Role.ADMIN) {

            throw new RuntimeException(
                    "Only admin can send ticket updates.");
        }

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        if (request.getMessage() == null
                || request.getMessage().trim().isEmpty()) {

            throw new RuntimeException(
                    "Message cannot be empty.");
        }

        TicketMessage ticketMessage = new TicketMessage();

        ticketMessage.setTicket(ticket);
        ticketMessage.setUser(currentUser);
        ticketMessage.setMessage(
                request.getMessage().trim()
        );
        ticketMessage.setCreatedAt(LocalDateTime.now());

        return ticketMessageRepository.save(ticketMessage);
    }
}