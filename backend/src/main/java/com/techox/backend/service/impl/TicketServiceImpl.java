package com.techox.backend.service.impl;

import com.techox.backend.dto.CreateTicketRequest;
import com.techox.backend.dto.UpdateTicketRequest;
import com.techox.backend.dto.UpdateTicketStatusRequest;
import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.User;
import com.techox.backend.enums.TicketStatus;
import com.techox.backend.repository.TicketRepository;
import com.techox.backend.repository.UserRepository;
import com.techox.backend.service.TicketService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    private final UserRepository userRepository;

    private final TicketRepository ticketRepository;

    public TicketServiceImpl(
            TicketRepository ticketRepository,
            UserRepository userRepository) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }


    @Override
    public Ticket createTicket(CreateTicketRequest request) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        System.out.println("Logged in user: " + email);

        Ticket ticket = new Ticket();

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority());

        ticket.setStatus(TicketStatus.OPEN);

        ticket.setCreatedAt(LocalDateTime.now());
        ticket.setUpdatedAt(LocalDateTime.now());

        ticket.setUser(user);
        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket getTicketById(Long id) {

        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    @Override
    public Ticket updateTicket(Long id, UpdateTicketRequest request) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority());

        ticket.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket updateTicketStatus(Long id,
                                     UpdateTicketStatusRequest request) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setStatus(request.getStatus());
        ticket.setUpdatedAt(LocalDateTime.now());

        return ticketRepository.save(ticket);
    }

    @Override
    public void deleteTicket(Long id) {

        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticketRepository.delete(ticket);
    }
}