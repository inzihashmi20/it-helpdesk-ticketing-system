import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";

import {
    getTicketById,
    updateTicketStatus,
    getTicketMessages,
    createTicketMessage,
} from "../services/ticketService";

function ViewTicket() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [sendingMessage, setSendingMessage] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const role = localStorage.getItem("role");

    // =====================================================
    // AUTOMATIC CLOSED MESSAGE
    // =====================================================

    const automaticClosedMessage =
        "Your ticket has been resolved and closed. " +
        "If you are still experiencing the issue, " +
        "please contact the IT team.";

    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        loadTicket();
        loadMessages();

    }, [id]);

    // =====================================================
    // LOAD TICKET
    // =====================================================

    const loadTicket = async () => {

        try {

            const response = await getTicketById(id);

            setTicket(response.data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load ticket.");

        }

    };

    // =====================================================
    // LOAD MESSAGES
    // =====================================================

    const loadMessages = async () => {

        try {

            const response = await getTicketMessages(id);

            setMessages(response.data || []);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load ticket updates.");

        }

    };

    // =====================================================
    // UPDATE STATUS
    // =====================================================

    const handleStatusChange = async (e) => {

        const newStatus = e.target.value;

        // -------------------------------------------------
        // If admin is closing the ticket and has written
        // a message, that message should be the final
        // employee-facing message.
        // -------------------------------------------------

        const customClosingMessage = newMessage.trim();

        try {

            setUpdatingStatus(true);

            // =================================================
            // CLOSE WITH CUSTOM MESSAGE
            // =================================================

            if (
                newStatus === "CLOSED" &&
                customClosingMessage
            ) {

                // First update ticket status.
                // Backend will create its automatic CLOSED
                // message, which we will hide from the UI.
                await updateTicketStatus(id, {
                    status: newStatus,
                });

                // Now save admin's custom closing message.
                await createTicketMessage(
                    id,
                    customClosingMessage
                );

                // Clear textbox.
                setNewMessage("");

                // Update ticket immediately.
                setTicket({
                    ...ticket,
                    status: newStatus,
                });

                // Reload messages.
                await loadMessages();

                toast.success(
                    "Ticket closed with your final update!"
                );

                return;
            }

            // =================================================
            // NORMAL STATUS CHANGE
            // =================================================

            await updateTicketStatus(id, {
                status: newStatus,
            });

            setTicket({
                ...ticket,
                status: newStatus,
            });

            // Backend may automatically create a message.
            await loadMessages();

            toast.success(
                "Ticket status updated successfully!"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to update ticket status."
            );

        } finally {

            setUpdatingStatus(false);

        }

    };

    // =====================================================
    // SEND MANUAL UPDATE
    // =====================================================

    const handleSendMessage = async () => {

        const message = newMessage.trim();

        if (!message) {

            toast.error("Please enter a message.");

            return;
        }

        // -------------------------------------------------
        // Don't allow sending a normal update when ticket
        // is already closed.
        // -------------------------------------------------

        if (ticket.status === "CLOSED") {

            toast.error(
                "This ticket is already closed."
            );

            return;
        }

        try {

            setSendingMessage(true);

            await createTicketMessage(
                id,
                message
            );

            setNewMessage("");

            await loadMessages();

            toast.success(
                "Ticket update sent successfully!"
            );

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to send ticket update."
            );

        } finally {

            setSendingMessage(false);

        }

    };

    // =====================================================
    // FILTER DISPLAYED MESSAGES
    // =====================================================

    const getDisplayedMessages = () => {

        /*
         * The backend automatically creates this message
         * when status changes to CLOSED.
         *
         * If there is a custom admin message, we don't want
         * to show the generic automatic message as well.
         *
         * So we hide the generic CLOSED message whenever
         * a custom message exists.
         */

        const hasCustomMessage = messages.some(
            (message) =>
                message.message !== automaticClosedMessage
        );

        if (
            ticket?.status === "CLOSED" &&
            hasCustomMessage
        ) {

            return messages.filter(
                (message) =>
                    message.message !==
                    automaticClosedMessage
            );

        }

        return messages;

    };

    // =====================================================
    // LOADING
    // =====================================================

    if (!ticket) {

        return (

            <Layout>

                <p>Loading ticket...</p>

            </Layout>

        );

    }

    const displayedMessages =
        getDisplayedMessages();

    // =====================================================
    // PAGE
    // =====================================================

    return (

        <Layout>

            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >

                {/* =================================================
                    BACK BUTTON
                ================================================= */}

                <button
                    onClick={() => navigate("/tickets")}
                    style={{
                        marginBottom: "25px",
                        padding: "10px 18px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#e2e8f0",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    ← Back to Tickets
                </button>


                {/* =================================================
                    TICKET DETAILS
                ================================================= */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "16px",
                        padding: "35px",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            color: "#1e293b",
                            fontSize: "32px",
                        }}
                    >
                        {ticket.title}
                    </h2>


                    <p
                        style={{
                            color: "#64748b",
                            marginBottom: "30px",
                        }}
                    >
                        Ticket #{ticket.id}
                    </p>


                    {/* DESCRIPTION */}

                    <div
                        style={{
                            marginBottom: "25px",
                        }}
                    >

                        <h3>Description</h3>

                        <p
                            style={{
                                color: "#475569",
                                lineHeight: "1.7",
                            }}
                        >
                            {ticket.description}
                        </p>

                    </div>


                    {/* =================================================
                        TICKET INFORMATION
                    ================================================= */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "20px",
                            marginBottom: "30px",
                        }}
                    >

                        {/* PRIORITY */}

                        <div>

                            <strong>Priority</strong>

                            <p>
                                {ticket.priority}
                            </p>

                        </div>


                        {/* STATUS */}

                        <div>

                            <strong
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                }}
                            >
                                Status
                            </strong>

                            {role === "ADMIN" ? (

                                <select
                                    value={ticket.status}
                                    onChange={handleStatusChange}
                                    disabled={updatingStatus}
                                    style={{
                                        width: "100%",
                                        maxWidth: "170px",
                                        padding: "9px 12px",
                                        borderRadius: "8px",
                                        border: "1px solid #cbd5e1",
                                        background: "#ffffff",
                                        color: "#1e293b",
                                        fontSize: "15px",
                                        cursor:
                                            updatingStatus
                                                ? "not-allowed"
                                                : "pointer",
                                        opacity:
                                            updatingStatus
                                                ? 0.6
                                                : 1,
                                        boxSizing: "border-box",
                                    }}
                                >

                                    <option value="OPEN">
                                        Open
                                    </option>

                                    <option value="IN_PROGRESS">
                                        In Progress
                                    </option>

                                    <option value="CLOSED">
                                        Closed
                                    </option>

                                </select>

                            ) : (

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#475569",
                                    }}
                                >
                                    {ticket.status}
                                </p>

                            )}

                        </div>

                        {/* CREATED BY */}

                        <div>

                            <strong>Created By</strong>

                            <p>
                                {ticket.user?.firstName}{" "}
                                {ticket.user?.lastName}
                            </p>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <strong>Email</strong>

                            <p>
                                {ticket.user?.email}
                            </p>

                        </div>


                        {/* CREATED AT */}

                        <div>

                            <strong>Created At</strong>

                            <p>
                                {new Date(
                                    ticket.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>


                        {/* UPDATED AT */}

                        <div>

                            <strong>Updated At</strong>

                            <p>
                                {new Date(
                                    ticket.updatedAt
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        EDIT BUTTON
                    ================================================= */}

                    <button
                        onClick={() =>
                            navigate(
                                `/tickets/edit/${ticket.id}`
                            )
                        }
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "12px 22px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        ✏️ Edit Ticket
                    </button>

                </div>


                {/* =================================================
                    TICKET UPDATES
                ================================================= */}

                <div
                    style={{
                        background: "white",
                        borderRadius: "16px",
                        padding: "30px",
                        marginTop: "25px",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >

                    <h2
                        style={{
                            marginTop: 0,
                            color: "#1e293b",
                            fontSize: "24px",
                        }}
                    >
                        Ticket Updates
                    </h2>


                    <p
                        style={{
                            color: "#64748b",
                            marginBottom: "25px",
                        }}
                    >
                        Updates from the IT support team.
                    </p>


                    {/* =================================================
                        ADMIN MESSAGE BOX
                    ================================================= */}

                    {role === "ADMIN" && ticket.status !== "CLOSED" && (

                        <div
                            style={{
                                marginBottom: "30px",
                                padding: "20px",
                                background: "#f8fafc",
                                borderRadius: "12px",
                                border:
                                    "1px solid #e2e8f0",
                            }}
                        >

                            <h3
                                style={{
                                    marginTop: 0,
                                    color: "#1e293b",
                                }}
                            >
                                Send Update
                            </h3>


                            <p
                                style={{
                                    color: "#64748b",
                                    fontSize: "14px",
                                    marginBottom: "12px",
                                }}
                            >
                                You can write an update here.
                                If you want to close the ticket,
                                this message will become the
                                final message for the employee.
                            </p>


                            <textarea
                                value={newMessage}
                                onChange={(e) =>
                                    setNewMessage(
                                        e.target.value
                                    )
                                }
                                placeholder="Write an update for the employee..."
                                rows="4"
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border:
                                        "1px solid #cbd5e1",
                                    resize: "vertical",
                                    fontSize: "15px",
                                    boxSizing: "border-box",
                                    outline: "none",
                                }}
                            />


                            <button
                                onClick={handleSendMessage}
                                disabled={
                                    sendingMessage ||
                                    updatingStatus
                                }
                                style={{
                                    marginTop: "12px",
                                    background:
                                        sendingMessage ||
                                            updatingStatus
                                            ? "#94a3b8"
                                            : "#2563eb",
                                    color: "white",
                                    border: "none",
                                    padding:
                                        "11px 20px",
                                    borderRadius: "8px",
                                    cursor:
                                        sendingMessage ||
                                            updatingStatus
                                            ? "not-allowed"
                                            : "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                {sendingMessage
                                    ? "Sending..."
                                    : "📨 Send Update"}
                            </button>

                        </div>

                    )}


                    {/* =================================================
                        MESSAGE LIST
                    ================================================= */}

                    {displayedMessages.length === 0 ? (

                        <div
                            style={{
                                padding: "20px",
                                background: "#f8fafc",
                                borderRadius: "10px",
                                color: "#64748b",
                                textAlign: "center",
                            }}
                        >
                            No updates yet.
                        </div>

                    ) : (

                        <div>

                            {displayedMessages.map(
                                (message) => (

                                    <div
                                        key={message.id}
                                        style={{
                                            padding: "18px",
                                            marginBottom: "15px",
                                            background: "#f8fafc",
                                            borderRadius: "12px",
                                            borderLeft:
                                                "4px solid #2563eb",
                                        }}
                                    >

                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "center",
                                                marginBottom:
                                                    "10px",
                                            }}
                                        >

                                            <strong
                                                style={{
                                                    color:
                                                        "#1e293b",
                                                }}
                                            >
                                                {message.userName}
                                            </strong>


                                            <span
                                                style={{
                                                    fontSize:
                                                        "13px",
                                                    color:
                                                        "#64748b",
                                                }}
                                            >
                                                {new Date(
                                                    message.createdAt
                                                ).toLocaleString()}
                                            </span>

                                        </div>


                                        <p
                                            style={{
                                                margin: 0,
                                                color: "#475569",
                                                lineHeight: "1.6",
                                            }}
                                        >
                                            {message.message}
                                        </p>


                                        <small
                                            style={{
                                                display: "block",
                                                marginTop: "8px",
                                                color: "#94a3b8",
                                            }}
                                        >
                                            {message.userRole}
                                        </small>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </Layout>

    );

}

export default ViewTicket;