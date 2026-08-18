import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import TicketForm from "../components/TicketForm";

import {
    getTicketById,
    updateTicket,
} from "../services/ticketService";

function EditTicket() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTicket();
    }, [id]);


    const loadTicket = async () => {

        try {

            setLoading(true);

            const response = await getTicketById(id);

            const ticket = response.data;

            setTitle(ticket.title || "");
            setDescription(ticket.description || "");
            setPriority(ticket.priority || "LOW");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to load ticket."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleUpdateTicket = async () => {

        if (!title.trim()) {
            toast.error("Please enter a ticket title.");
            return;
        }

        if (!description.trim()) {
            toast.error("Please describe the issue.");
            return;
        }

        try {

            await updateTicket(id, {
                title: title.trim(),
                description: description.trim(),
                priority,
            });

            toast.success("Ticket updated successfully!");

            navigate("/tickets");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to update ticket."
            );

        }

    };


    if (loading) {

        return (

            <Layout title="Edit Ticket">

                <div
                    style={{
                        maxWidth: "820px",
                        margin: "0 auto",
                    }}
                >

                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "18px",
                            padding: "60px 30px",
                            textAlign: "center",
                            border: "1px solid #e2e8f0",
                            boxShadow:
                                "0 8px 25px rgba(15,23,42,0.06)",
                        }}
                    >

                        <div
                            style={{
                                fontSize: "30px",
                                marginBottom: "12px",
                            }}
                        >
                            🎫
                        </div>

                        <h3
                            style={{
                                margin: 0,
                                color: "#1e293b",
                                fontSize: "18px",
                            }}
                        >
                            Loading ticket...
                        </h3>

                        <p
                            style={{
                                marginTop: "7px",
                                color: "#64748b",
                                fontSize: "13px",
                            }}
                        >
                            Please wait while we load the ticket details.
                        </p>

                    </div>

                </div>

            </Layout>

        );

    }


    return (

        <Layout title="Edit Ticket">

            <div
                style={{
                    maxWidth: "820px",
                    margin: "0 auto",
                }}
            >

                {/* PAGE HEADER */}

                <div
                    style={{
                        marginBottom: "28px",
                    }}
                >

                    <button
                        onClick={() => navigate("/tickets")}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#64748b",
                            padding: 0,
                            marginBottom: "18px",
                            fontSize: "14px",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        ← Back to Tickets
                    </button>


                    <div>

                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "6px 11px",
                                borderRadius: "20px",
                                background: "#f1f5f9",
                                color: "#475569",
                                fontSize: "12px",
                                fontWeight: "700",
                                marginBottom: "10px",
                            }}
                        >
                            TICKET #{id}
                        </div>


                        <h2
                            style={{
                                margin: 0,
                                color: "#1e293b",
                                fontSize: "36px",
                                lineHeight: "1.2",
                                fontWeight: "750",
                            }}
                        >
                            Edit Ticket
                        </h2>


                        <p
                            style={{
                                color: "#64748b",
                                marginTop: "9px",
                                marginBottom: 0,
                                fontSize: "15px",
                                lineHeight: "1.6",
                            }}
                        >
                            Update the ticket information and priority
                            below.
                        </p>

                    </div>

                </div>


                {/* FORM */}

                <TicketForm

                    title={title}
                    setTitle={setTitle}

                    description={description}
                    setDescription={setDescription}

                    priority={priority}
                    setPriority={setPriority}

                    buttonText="Save Changes"

                    onSubmit={handleUpdateTicket}

                />


                {/* FOOTNOTE */}

                <p
                    style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "12px",
                        marginTop: "18px",
                    }}
                >
                    Updating this ticket will not change its current
                    status.
                </p>

            </div>

        </Layout>

    );

}

export default EditTicket;