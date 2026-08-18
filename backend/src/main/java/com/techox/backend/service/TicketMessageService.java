package com.techox.backend.service;

import com.techox.backend.dto.CreateTicketMessageRequest;
import com.techox.backend.entity.TicketMessage;

import java.util.List;

public interface TicketMessageService {

    List<TicketMessage> getMessages(Long ticketId);

    TicketMessage createMessage(
            Long ticketId,
            CreateTicketMessageRequest request);
}