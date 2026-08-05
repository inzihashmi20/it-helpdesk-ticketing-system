package com.techox.backend.service.impl;

import com.techox.backend.enums.Priority;
import com.techox.backend.enums.TicketStatus;
import com.techox.backend.repository.TicketRepository;
import com.techox.backend.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final TicketRepository ticketRepository;

    public DashboardServiceImpl(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @Override
    public long getTotalTickets() {
        return ticketRepository.count();
    }

    @Override
    public long getOpenTickets() {
        return ticketRepository.countByStatus(TicketStatus.OPEN);
    }

    @Override
    public long getClosedTickets() {
        return ticketRepository.countByStatus(TicketStatus.CLOSED);
    }

    @Override
    public long getInProgressTickets() {
        return ticketRepository.countByStatus(TicketStatus.IN_PROGRESS);
    }

    @Override
    public long getHighPriorityTickets() {
        return ticketRepository.countByPriority(Priority.HIGH);
    }
}