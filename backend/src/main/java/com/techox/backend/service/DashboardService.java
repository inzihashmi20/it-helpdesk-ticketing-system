package com.techox.backend.service;

public interface DashboardService {

    long getTotalTickets();

    long getOpenTickets();

    long getClosedTickets();

    long getInProgressTickets();

    long getHighPriorityTickets();

}