package com.techox.backend.repository;

import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.TicketMessage;
import com.techox.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketMessageRepository
        extends JpaRepository<TicketMessage, Long> {

    List<TicketMessage> findByTicketOrderByCreatedAtAsc(Ticket ticket);

    void deleteByTicket(Ticket ticket);

    void deleteByUser(User user);
}