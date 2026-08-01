package com.techox.backend.dto;

import com.techox.backend.enums.TicketStatus;
import lombok.Data;

@Data
public class UpdateTicketStatusRequest {

    private TicketStatus status;

}