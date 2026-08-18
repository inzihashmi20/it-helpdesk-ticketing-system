import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import Layout from "../components/Layout";

import {
    getAllTickets,
    deleteTicket,
} from "../services/ticketService";

import toast from "react-hot-toast";

function Tickets() {

    const navigate = useNavigate();

    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");

    const [searchParams] = useSearchParams();

    const [statusFilter, setStatusFilter] = useState(
        searchParams.get("status") || "ALL"
    );

    const [priorityFilter, setPriorityFilter] = useState(
        searchParams.get("priority") || "ALL"
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const [loading, setLoading] = useState(true);


    // =========================================================
    // LOAD TICKETS
    // =========================================================

    useEffect(() => {
        fetchTickets();
    }, []);


    const fetchTickets = async () => {

        try {

            setLoading(true);

            const response = await getAllTickets();

            setTickets(response.data || []);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load tickets.");

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // DELETE
    // =========================================================

    const handleDelete = (id) => {

        setSelectedTicketId(id);
        setIsModalOpen(true);

    };


    const confirmDelete = async () => {

        try {

            await deleteTicket(selectedTicketId);

            setIsModalOpen(false);
            setSelectedTicketId(null);

            await fetchTickets();

            toast.success(
                "Ticket deleted successfully!",
                {
                    duration: 2500,
                }
            );

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete ticket.");

        }

    };


    const cancelDelete = () => {

        setIsModalOpen(false);
        setSelectedTicketId(null);

    };


    // =========================================================
    // FILTER
    // =========================================================

    const filteredTickets = tickets.filter((ticket) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            ticket.title
                ?.toLowerCase()
                .includes(searchText)

            ||

            ticket.description
                ?.toLowerCase()
                .includes(searchText);


        const matchesStatus =
            statusFilter === "ALL" ||
            ticket.status === statusFilter;


        const matchesPriority =
            priorityFilter === "ALL" ||
            ticket.priority === priorityFilter;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );

    });


    // =========================================================
    // DISPLAY NUMBER
    // =========================================================

    const getDisplayNumber = (ticket) => {

        const originalIndex = tickets.findIndex(
            (item) => item.id === ticket.id
        );

        return originalIndex + 1;

    };


    // =========================================================
    // STATUS BADGE
    // =========================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "OPEN":
                return {
                    background: "#ecfdf5",
                    color: "#15803d",
                    border: "1px solid #bbf7d0",
                };

            case "IN_PROGRESS":
                return {
                    background: "#fff7ed",
                    color: "#c2410c",
                    border: "1px solid #fed7aa",
                };

            case "CLOSED":
                return {
                    background: "#f1f5f9",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                };

            default:
                return {
                    background: "#f8fafc",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                };

        }

    };


    // =========================================================
    // PRIORITY BADGE
    // =========================================================

    const getPriorityStyle = (priority) => {

        switch (priority) {

            case "HIGH":
                return {
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                };

            case "MEDIUM":
                return {
                    background: "#fffbeb",
                    color: "#b45309",
                    border: "1px solid #fde68a",
                };

            case "LOW":
                return {
                    background: "#ecfdf5",
                    color: "#15803d",
                    border: "1px solid #bbf7d0",
                };

            default:
                return {
                    background: "#f8fafc",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                };

        }

    };


    // =========================================================
    // CLEAR FILTERS
    // =========================================================

    const clearFilters = () => {

        setSearch("");
        setStatusFilter("ALL");
        setPriorityFilter("ALL");

    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <Layout title="Tickets">

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
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "28px",
                    }}
                >

                    <div>

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

                            Helpdesk

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
                            Tickets
                        </h1>


                        <p
                            style={{
                                margin: "8px 0 0",
                                color: "#64748b",
                                fontSize: "15px",
                            }}
                        >
                            Manage and track your support requests.
                        </p>

                    </div>


                    {/* =================================================
                        NEW TICKET BUTTON
                    ================================================= */}

                    <button
                        onClick={() =>
                            navigate("/tickets/create")
                        }
                        style={styles.primaryButton}
                        onMouseEnter={(e) => {

                            e.currentTarget.style.background =
                                "#1d4ed8";

                            e.currentTarget.style.transform =
                                "translateY(-2px)";

                        }}
                        onMouseLeave={(e) => {

                            e.currentTarget.style.background =
                                "#2563eb";

                            e.currentTarget.style.transform =
                                "translateY(0)";

                        }}
                    >
                        + New Ticket
                    </button>

                </div>


                {/* =====================================================
                    FILTER BAR
                ====================================================== */}

                <div
                    style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "14px",
                        padding: "14px",
                        marginBottom: "18px",
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        boxShadow:
                            "0 4px 14px rgba(15,23,42,0.035)",
                    }}
                >

                    {/* SEARCH */}

                    <div
                        style={{
                            flex: 1,
                            minWidth: "280px",
                            position: "relative",
                        }}
                    >

                        <span
                            style={{
                                position: "absolute",
                                left: "14px",
                                top: "50%",
                                transform:
                                    "translateY(-50%)",
                                fontSize: "14px",
                                color: "#94a3b8",
                                pointerEvents: "none",
                            }}
                        >
                            🔎
                        </span>


                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            style={{
                                ...inputStyle,
                                paddingLeft: "40px",
                            }}
                        />

                    </div>


                    {/* STATUS */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        style={selectStyle}
                    >

                        <option value="ALL">
                            All Status
                        </option>

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


                    {/* PRIORITY */}

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                        style={selectStyle}
                    >

                        <option value="ALL">
                            All Priority
                        </option>

                        <option value="LOW">
                            Low
                        </option>

                        <option value="MEDIUM">
                            Medium
                        </option>

                        <option value="HIGH">
                            High
                        </option>

                    </select>


                    {/* CLEAR */}

                    {(search ||
                        statusFilter !== "ALL" ||
                        priorityFilter !== "ALL") && (

                        <button
                            onClick={clearFilters}
                            style={clearButtonStyle}
                        >
                            Clear
                        </button>

                    )}

                </div>


                {/* =====================================================
                    RESULTS COUNT
                ====================================================== */}

                {!loading && (

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                            padding: "0 3px",
                        }}
                    >

                        <span
                            style={{
                                color: "#64748b",
                                fontSize: "13px",
                            }}
                        >
                            Showing{" "}

                            <strong
                                style={{
                                    color: "#334155",
                                }}
                            >
                                {filteredTickets.length}
                            </strong>{" "}

                            {filteredTickets.length === 1
                                ? "ticket"
                                : "tickets"}

                        </span>

                    </div>

                )}


                {/* =====================================================
                    TABLE
                ====================================================== */}

                <div
                    style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                            "0 6px 20px rgba(15,23,42,0.05)",
                    }}
                >

                    {loading ? (

                        <div
                            style={{
                                padding: "80px 20px",
                                textAlign: "center",
                            }}
                        >

                            <div
                                style={{
                                    width: "52px",
                                    height: "52px",
                                    margin: "0 auto 16px",
                                    borderRadius: "14px",
                                    background: "#eff6ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "24px",
                                }}
                            >
                                🎫
                            </div>


                            <div
                                style={{
                                    color: "#334155",
                                    fontWeight: "650",
                                    fontSize: "15px",
                                }}
                            >
                                Loading tickets...
                            </div>

                        </div>

                    ) : (

                        <div
                            style={{
                                overflowX: "auto",
                            }}
                        >

                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    minWidth: "900px",
                                }}
                            >

                                {filteredTickets.length > 0 && (

                                    <thead>

                                        <tr
                                            style={{
                                                background:
                                                    "#f8fafc",
                                                borderBottom:
                                                    "1px solid #e2e8f0",
                                            }}
                                        >

                                            <th style={styles.th}>
                                                #
                                            </th>

                                            <th style={styles.th}>
                                                Ticket
                                            </th>

                                            <th style={styles.th}>
                                                Status
                                            </th>

                                            <th style={styles.th}>
                                                Priority
                                            </th>

                                            <th style={styles.th}>
                                                Created By
                                            </th>

                                            <th
                                                style={{
                                                    ...styles.th,
                                                    textAlign:
                                                        "right",
                                                }}
                                            >
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                )}


                                <tbody>

                                    {filteredTickets.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="6"
                                                style={{
                                                    padding:
                                                        "75px 20px",
                                                    textAlign:
                                                        "center",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        width: "60px",
                                                        height: "60px",
                                                        margin:
                                                            "0 auto 16px",
                                                        borderRadius:
                                                            "18px",
                                                        background:
                                                            "#eff6ff",
                                                        display:
                                                            "flex",
                                                        alignItems:
                                                            "center",
                                                        justifyContent:
                                                            "center",
                                                        fontSize:
                                                            "26px",
                                                    }}
                                                >
                                                    📭
                                                </div>


                                                <h3
                                                    style={{
                                                        margin:
                                                            "0 0 7px",
                                                        color:
                                                            "#1e293b",
                                                        fontSize:
                                                            "17px",
                                                    }}
                                                >
                                                    No tickets found
                                                </h3>


                                                <p
                                                    style={{
                                                        margin:
                                                            "0 0 20px",
                                                        color:
                                                            "#64748b",
                                                        fontSize:
                                                            "13px",
                                                    }}
                                                >
                                                    {tickets.length ===
                                                    0
                                                        ? "You don't have any tickets yet."
                                                        : "Try changing your search or filters."}
                                                </p>


                                                {tickets.length > 0 && (

                                                    <button
                                                        onClick={
                                                            clearFilters
                                                        }
                                                        style={{
                                                            background:
                                                                "#2563eb",
                                                            color:
                                                                "#ffffff",
                                                            border:
                                                                "none",
                                                            padding:
                                                                "10px 17px",
                                                            borderRadius:
                                                                "9px",
                                                            cursor:
                                                                "pointer",
                                                            fontWeight:
                                                                "650",
                                                        }}
                                                    >
                                                        Clear Filters
                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    ) : (

                                        filteredTickets.map(
                                            (ticket) => (

                                                <tr
                                                    key={ticket.id}
                                                    style={{
                                                        borderBottom:
                                                            "1px solid #eef2f7",
                                                        transition:
                                                            "background 0.18s ease",
                                                    }}
                                                    onMouseEnter={(e) => {

                                                        e.currentTarget.style.background =
                                                            "#fafcff";

                                                    }}
                                                    onMouseLeave={(e) => {

                                                        e.currentTarget.style.background =
                                                            "#ffffff";

                                                    }}
                                                >

                                                    {/* NUMBER */}

                                                    <td
                                                        style={{
                                                            ...styles.td,
                                                            color:
                                                                "#94a3b8",
                                                            fontWeight:
                                                                "700",
                                                            width:
                                                                "55px",
                                                        }}
                                                    >
                                                        {getDisplayNumber(
                                                            ticket
                                                        )}
                                                    </td>


                                                    {/* TICKET */}

                                                    <td
                                                        style={{
                                                            ...styles.td,
                                                            minWidth:
                                                                "260px",
                                                        }}
                                                    >

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/tickets/view/${ticket.id}`
                                                                )
                                                            }
                                                            style={{
                                                                border:
                                                                    "none",
                                                                background:
                                                                    "transparent",
                                                                padding:
                                                                    0,
                                                                cursor:
                                                                    "pointer",
                                                                color:
                                                                    "#1e293b",
                                                                fontSize:
                                                                    "14px",
                                                                fontWeight:
                                                                    "700",
                                                                textAlign:
                                                                    "left",
                                                            }}
                                                        >
                                                            {ticket.title}
                                                        </button>


                                                        <div
                                                            style={{
                                                                color:
                                                                    "#94a3b8",
                                                                fontSize:
                                                                    "12px",
                                                                marginTop:
                                                                    "5px",
                                                                maxWidth:
                                                                    "350px",
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                whiteSpace:
                                                                    "nowrap",
                                                            }}
                                                        >
                                                            {ticket.description}
                                                        </div>

                                                    </td>


                                                    {/* STATUS */}

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <span
                                                            style={{
                                                                ...badgeStyle,
                                                                ...getStatusStyle(
                                                                    ticket.status
                                                                ),
                                                            }}
                                                        >

                                                            <span
                                                                style={{
                                                                    width:
                                                                        "6px",
                                                                    height:
                                                                        "6px",
                                                                    borderRadius:
                                                                        "50%",
                                                                    background:
                                                                        "currentColor",
                                                                }}
                                                            />

                                                            {ticket.status ===
                                                            "IN_PROGRESS"
                                                                ? "In Progress"
                                                                : ticket.status ===
                                                                  "OPEN"
                                                                ? "Open"
                                                                : "Closed"}

                                                        </span>

                                                    </td>


                                                    {/* PRIORITY */}

                                                    <td
                                                        style={
                                                            styles.td
                                                        }
                                                    >

                                                        <span
                                                            style={{
                                                                ...badgeStyle,
                                                                ...getPriorityStyle(
                                                                    ticket.priority
                                                                ),
                                                            }}
                                                        >
                                                            {ticket.priority}
                                                        </span>

                                                    </td>


                                                    {/* CREATED BY */}

                                                    <td
                                                        style={{
                                                            ...styles.td,
                                                            color:
                                                                "#475569",
                                                        }}
                                                    >

                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    "600",
                                                                color:
                                                                    "#334155",
                                                            }}
                                                        >
                                                            {ticket.user?.firstName}{" "}
                                                            {ticket.user?.lastName}
                                                        </div>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td
                                                        style={{
                                                            ...styles.td,
                                                            textAlign:
                                                                "right",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >

                                                        <button
                                                            style={
                                                                styles.actionButton
                                                            }
                                                            title="View ticket"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/tickets/view/${ticket.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>


                                                        {ticket.status !==
                                                            "CLOSED" && (

                                                            <button
                                                                style={
                                                                    styles.actionButton
                                                                }
                                                                title="Edit ticket"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/tickets/edit/${ticket.id}`
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                        )}


                                                        <button
                                                            style={{
                                                                ...styles.actionButton,
                                                                color:
                                                                    "#dc2626",
                                                                borderColor:
                                                                    "#fecaca",
                                                                background:
                                                                    "#fffafa",
                                                            }}
                                                            title="Delete ticket"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    ticket.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>


            {/* =========================================================
                DELETE MODAL
            ========================================================== */}

            <ConfirmModal
                isOpen={isModalOpen}
                title="Delete Ticket"
                message="Are you sure you want to delete this ticket? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />

        </Layout>

    );

}


// =========================================================
// STYLES
// =========================================================

const primaryButton = {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "14px 24px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition:
        "transform 0.2s ease, background 0.2s ease",
    whiteSpace: "nowrap",
};


const inputStyle = {
    width: "100%",
    height: "42px",
    padding: "0 14px",
    borderRadius: "9px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#1e293b",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
};


const selectStyle = {
    height: "42px",
    padding: "0 14px",
    borderRadius: "9px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#334155",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "145px",
    outline: "none",
};


const clearButtonStyle = {
    height: "42px",
    border: "none",
    background: "#f1f5f9",
    color: "#475569",
    borderRadius: "9px",
    padding: "0 15px",
    fontWeight: "650",
    cursor: "pointer",
};


const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
};


const styles = {

    primaryButton,

    th: {
        padding: "15px 18px",
        textAlign: "left",
        color: "#64748b",
        fontSize: "11px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },


    td: {
        padding: "17px 18px",
        color: "#334155",
        fontSize: "14px",
        verticalAlign: "middle",
    },


    actionButton: {
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        color: "#475569",
        height: "32px",
        padding: "0 10px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "650",
        marginLeft: "6px",
        transition:
            "background 0.2s ease, transform 0.2s ease",
    },

};


export default Tickets;