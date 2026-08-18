package com.techox.backend.service.impl;

import com.techox.backend.entity.User;
import com.techox.backend.enums.Priority;
import com.techox.backend.enums.Role;
import com.techox.backend.enums.TicketStatus;
import com.techox.backend.repository.TicketRepository;
import com.techox.backend.repository.UserRepository;
import com.techox.backend.service.DashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public DashboardServiceImpl(
            TicketRepository ticketRepository,
            UserRepository userRepository) {

        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public long getTotalTickets() {

        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN) {
            return ticketRepository.count();
        }

        return ticketRepository.countByUser(currentUser);
    }

    @Override
    public long getOpenTickets() {

        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN) {
            return ticketRepository.countByStatus(TicketStatus.OPEN);
        }

        return ticketRepository.countByUserAndStatus(
                currentUser,
                TicketStatus.OPEN
        );
    }

    @Override
    public long getClosedTickets() {

        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN) {
            return ticketRepository.countByStatus(TicketStatus.CLOSED);
        }

        return ticketRepository.countByUserAndStatus(
                currentUser,
                TicketStatus.CLOSED
        );
    }

    @Override
    public long getInProgressTickets() {

        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN) {
            return ticketRepository.countByStatus(TicketStatus.IN_PROGRESS);
        }

        return ticketRepository.countByUserAndStatus(
                currentUser,
                TicketStatus.IN_PROGRESS
        );
    }

    @Override
    public long getHighPriorityTickets() {

        User currentUser = getCurrentUser();

        if (currentUser.getRole() == Role.ADMIN) {
            return ticketRepository.countByPriority(Priority.HIGH);
        }

        return ticketRepository.countByUserAndPriority(
                currentUser,
                Priority.HIGH
        );
    }
}