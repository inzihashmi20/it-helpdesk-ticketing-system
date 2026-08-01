package com.techox.backend.service;

import com.techox.backend.dto.CreateTicketRequest;
import com.techox.backend.dto.UpdateTicketRequest;
import com.techox.backend.dto.UpdateTicketStatusRequest;
import com.techox.backend.entity.Ticket;

import java.util.List;

public interface TicketService {

    Ticket createTicket(CreateTicketRequest request);

    List<Ticket> getAllTickets();

    Ticket getTicketById(Long id);

    Ticket updateTicket(Long id, UpdateTicketRequest request);

    Ticket updateTicketStatus(Long id, UpdateTicketStatusRequest request);

    void deleteTicket(Long id);
}