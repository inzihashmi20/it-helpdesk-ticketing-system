import api from "../api/api";

export const getTotalTickets = async () => {
    const response = await api.get("/dashboard/total-tickets");
    return response.data;
};

export const getOpenTickets = async () => {
    const response = await api.get("/dashboard/open-tickets");
    return response.data;
};

export const getClosedTickets = async () => {
    const response = await api.get("/dashboard/closed-tickets");
    return response.data;
};

export const getInProgressTickets = async () => {
    const response = await api.get("/dashboard/in-progress-tickets");
    return response.data;
};

export const getHighPriorityTickets = async () => {
    const response = await api.get("/dashboard/high-priority-tickets");
    return response.data;
};