package com.techox.backend.mapper;

import com.techox.backend.dto.TicketResponse;
import com.techox.backend.dto.UserResponse;
import com.techox.backend.entity.Ticket;
import com.techox.backend.entity.User;

public class TicketMapper {

    public static TicketResponse toResponse(Ticket ticket) {

        User user = ticket.getUser();

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );

        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt(),
                userResponse
        );
    }
}