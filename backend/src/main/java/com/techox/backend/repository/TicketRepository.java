package com.techox.backend.repository;

import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.User;
import com.techox.backend.enums.Priority;
import com.techox.backend.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByUser(User user);

    long count();

    long countByStatus(TicketStatus status);

    long countByPriority(Priority priority);
}