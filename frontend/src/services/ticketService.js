import api from "../api/api";

export const getAllTickets = async () => {
    const response = await api.get("/tickets");
    return response.data;
};

export const getTicketById = async (id) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
};

export const createTicket = async (ticket) => {
    const response = await api.post("/tickets", ticket);
    return response.data;
};

export const updateTicket = async (id, ticket) => {
    const response = await api.put(`/tickets/${id}`, ticket);
    return response.data;
};

export const deleteTicket = async (id) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
};

export const updateTicketStatus = async (id, status) => {
    const response = await api.patch(
        `/tickets/${id}/status`,
        status
    );

    return response.data;
};

export const getTicketMessages = async (ticketId) => {
    const response = await api.get(
        `/tickets/${ticketId}/messages`
    );

    return response.data;
};

// =========================================================
// SEND TICKET UPDATE
// =========================================================

export const createTicketMessage = async (ticketId, message) => {
    const response = await api.post(
        `/tickets/${ticketId}/messages`,
        {
            message: message,
        }
    );

    return response.data;
};