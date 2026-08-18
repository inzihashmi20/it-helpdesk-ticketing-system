import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import TicketForm from "../components/TicketForm";

import { createTicket } from "../services/ticketService";

import toast from "react-hot-toast";

function CreateTicket() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("LOW");

    const handleCreateTicket = async () => {

        // Basic frontend validation
        if (!title.trim()) {
            toast.error("Please enter a ticket title.");
            return;
        }

        if (!description.trim()) {
            toast.error("Please describe the issue.");
            return;
        }

        try {

            await createTicket({
                title: title.trim(),
                description: description.trim(),
                priority,
            });

            toast.success("Ticket created successfully!");

            navigate("/tickets");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to create ticket."
            );

        }

    };

    return (

        <Layout title="Create Ticket">

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
                                background: "#eff6ff",
                                color: "#2563eb",
                                fontSize: "12px",
                                fontWeight: "700",
                                marginBottom: "10px",
                            }}
                        >
                            NEW SUPPORT REQUEST
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
                            Create New Ticket
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
                            Tell us what you're experiencing and provide
                            enough detail for the IT team to help you.
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

                    buttonText="Create Ticket"

                    onSubmit={handleCreateTicket}

                />


                {/* SMALL FOOTNOTE */}

                <p
                    style={{
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "12px",
                        marginTop: "18px",
                    }}
                >
                    Please provide accurate information so the IT team
                    can resolve your issue faster.
                </p>

            </div>

        </Layout>

    );
}

export default CreateTicket;