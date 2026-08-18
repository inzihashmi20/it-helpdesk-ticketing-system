import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import toast from "react-hot-toast";

import {
    getTotalTickets,
    getOpenTickets,
    getClosedTickets,
    getInProgressTickets,
    getHighPriorityTickets,
} from "../services/dashboardService";


function Dashboard() {

    const [totalTickets, setTotalTickets] = useState(0);
    const [openTickets, setOpenTickets] = useState(0);
    const [closedTickets, setClosedTickets] = useState(0);
    const [inProgressTickets, setInProgressTickets] = useState(0);
    const [highPriorityTickets, setHighPriorityTickets] = useState(0);

    const role = localStorage.getItem("role");

    useEffect(() => {
        fetchDashboardData();
    }, []);


    const fetchDashboardData = async () => {

        try {

            const total = await getTotalTickets();
            const open = await getOpenTickets();
            const closed = await getClosedTickets();
            const progress = await getInProgressTickets();
            const high = await getHighPriorityTickets();

            setTotalTickets(total.data);
            setOpenTickets(open.data);
            setClosedTickets(closed.data);
            setInProgressTickets(progress.data);
            setHighPriorityTickets(high.data);

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load dashboard."
            );

        }

    };


    return (

        <Layout title="Dashboard">

            <div
                style={{
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >

                {/* =====================================================
                    HEADER
                ====================================================== */}

                <div
                    style={{
                        marginBottom: "30px",
                    }}
                >

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "7px",
                            color: "#2563eb",
                            fontSize: "12px",
                            fontWeight: "800",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                        }}
                    >

                        <span
                            style={{
                                width: "7px",
                                height: "7px",
                                borderRadius: "50%",
                                background: "#2563eb",
                            }}
                        />

                        Helpdesk Overview

                    </div>


                    <h1
                        style={{
                            margin: 0,
                            fontSize: "36px",
                            lineHeight: "1.15",
                            color: "#172033",
                            fontWeight: "750",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        Dashboard
                    </h1>


                    <p
                        style={{
                            margin:
                                "9px 0 0",
                            color: "#64748b",
                            fontSize: "15px",
                            lineHeight: "1.6",
                        }}
                    >
                        {role === "ADMIN"
                            ? "Monitor your helpdesk activity and keep track of incoming support requests."
                            : "Keep track of your support requests and stay updated on their progress."
                        }
                    </p>

                </div>


                {/* =====================================================
                    STAT CARDS
                ====================================================== */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "18px",
                        marginBottom: "25px",
                    }}
                >

                    <StatCard
                        title={
                            role === "ADMIN"
                                ? "Total Tickets"
                                : "My Tickets"
                        }
                        value={totalTickets}
                        path="/tickets"
                        icon="🎫"
                        accent="#2563eb"
                    />


                    <StatCard
                        title="Open Tickets"
                        value={openTickets}
                        path="/tickets?status=OPEN"
                        icon="📂"
                        accent="#0ea5e9"
                    />


                    <StatCard
                        title="In Progress"
                        value={inProgressTickets}
                        path="/tickets?status=IN_PROGRESS"
                        icon="⚙️"
                        accent="#f59e0b"
                    />


                    <StatCard
                        title="Closed Tickets"
                        value={closedTickets}
                        path="/tickets?status=CLOSED"
                        icon="✓"
                        accent="#16a34a"
                    />


                    <StatCard
                        title="High Priority"
                        value={highPriorityTickets}
                        path="/tickets?priority=HIGH"
                        icon="!"
                        accent="#dc2626"
                    />

                </div>

                {/* =====================================================
    QUICK TIP
===================================================== */}

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        background: "#f8fbff",
                        border: "1px solid #dbeafe",
                        borderRadius: "14px",
                        padding: "17px 20px",
                        marginTop: "4px",
                    }}
                >

                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "#eff6ff",
                            color: "#2563eb",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "17px",
                            fontWeight: "700",
                            flexShrink: 0,
                        }}
                    >
                        i
                    </div>


                    <div>

                        <div
                            style={{
                                color: "#1e3a8a",
                                fontSize: "14px",
                                fontWeight: "700",
                                marginBottom: "3px",
                            }}
                        >
                            Quick tip
                        </div>

                        <div
                            style={{
                                color: "#64748b",
                                fontSize: "13px",
                                lineHeight: "1.5",
                            }}
                        >
                            Select a dashboard card to jump directly to the related tickets.
                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;