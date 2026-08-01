package com.techox.backend.dto;

import com.techox.backend.enums.Priority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTicketRequest {

    private String title;
    private String description;
    private Priority priority;
}