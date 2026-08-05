package com.techox.backend.controller;

import com.techox.backend.dto.ApiResponse;
import com.techox.backend.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/total-tickets")
    public ResponseEntity<ApiResponse> getTotalTickets() {

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Total tickets fetched successfully.",
                        dashboardService.getTotalTickets()
                )
        );
    }

    @GetMapping("/open-tickets")
    public ResponseEntity<ApiResponse> getOpenTickets() {

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Open tickets fetched successfully.",
                        dashboardService.getOpenTickets()
                )
        );
    }

    @GetMapping("/closed-tickets")
    public ResponseEntity<ApiResponse> getClosedTickets() {

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "Closed tickets fetched successfully.",
                        dashboardService.getClosedTickets()
                )
        );
    }

    @GetMapping("/in-progress-tickets")
    public ResponseEntity<ApiResponse> getInProgressTickets() {

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "In-progress tickets fetched successfully.",
                        dashboardService.getInProgressTickets()
                )
        );
    }

    @GetMapping("/high-priority-tickets")
    public ResponseEntity<ApiResponse> getHighPriorityTickets() {

        return ResponseEntity.ok(
                new ApiResponse(
                        true,
                        "High priority tickets fetched successfully.",
                        dashboardService.getHighPriorityTickets()
                )
        );
    }
}