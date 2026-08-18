import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";

import {
    getAllUsers,
    deleteUser,
} from "../services/userService";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await getAllUsers();

            setUsers(data);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load users.");

        }

    };

    const handleDelete = async () => {

        try {

            await deleteUser(selectedUserId);

            toast.success("User deleted successfully.");

            setShowModal(false);

            loadUsers();

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete user.");

        }

    };

    const filteredUsers = users.filter((user) =>

        `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        user.email
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <Layout>

            {/* PAGE HEADER */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "25px",
                    gap: "20px",
                }}
            >

                <div>

                    <h1
                        style={{
                            margin: 0,
                            color: "#1e293b",
                            fontSize: "38px",
                            fontWeight: "750",
                        }}
                    >
                        Users
                    </h1>

                    <p
                        style={{
                            color: "#64748b",
                            marginTop: "8px",
                            marginBottom: 0,
                            fontSize: "15px",
                        }}
                    >
                        Manage employees and administrators.
                    </p>

                </div>

                <Link
                    to="/users/create"
                    style={{
                        background: "#2563eb",
                        color: "white",
                        padding: "14px 22px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        boxShadow:
                            "0 5px 14px rgba(37,99,235,0.20)",
                    }}
                >
                    + New User
                </Link>

            </div>


            {/* SEARCH */}

            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px 16px",
                    marginBottom: "25px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#1e293b",
                    boxSizing: "border-box",
                    fontSize: "14px",
                }}
            />


            {/* USERS TABLE */}

            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "15px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                        "0 4px 15px rgba(15,23,42,0.05)",
                    overflowX: "auto",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: "700px",
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f8fafc",
                            }}
                        >

                            <th style={styles.th}>
                                #
                            </th>

                            <th style={styles.th}>
                                Name
                            </th>

                            <th style={styles.th}>
                                Email
                            </th>

                            <th style={styles.th}>
                                Role
                            </th>

                            <th style={styles.th}>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {
                            filteredUsers.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            padding: "70px 20px",
                                            textAlign: "center",
                                            color: "#64748b",
                                            background: "#ffffff",
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontSize: "30px",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            👥
                                        </div>

                                        <div
                                            style={{
                                                fontWeight: "650",
                                                color: "#1e293b",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            No users found
                                        </div>

                                        <div
                                            style={{
                                                fontSize: "13px",
                                            }}
                                        >
                                            Try changing your search.
                                        </div>

                                    </td>

                                </tr>

                            ) : (

                                filteredUsers.map((user, index) => (

                                    <tr
                                        key={user.id}
                                        style={{
                                            borderBottom:
                                                "1px solid #e2e8f0",
                                            background: "#ffffff",
                                            transition:
                                                "background 0.2s ease",
                                        }}

                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                "#f8fafc";
                                        }}

                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                                "#ffffff";
                                        }}
                                    >

                                        {/* DISPLAY NUMBER */}

                                        <td
                                            style={{
                                                ...styles.td,
                                                color: "#64748b",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {index + 1}
                                        </td>


                                        {/* NAME */}

                                        <td
                                            style={{
                                                ...styles.td,
                                                color: "#1e293b",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {user.firstName}{" "}
                                            {user.lastName}
                                        </td>


                                        {/* EMAIL */}

                                        <td
                                            style={{
                                                ...styles.td,
                                                color: "#64748b",
                                            }}
                                        >
                                            {user.email}
                                        </td>


                                        {/* ROLE */}

                                        <td style={styles.td}>

                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    padding: "6px 13px",
                                                    borderRadius: "20px",

                                                    background:
                                                        user.role === "ADMIN"
                                                            ? "#dbeafe"
                                                            : "#dcfce7",

                                                    color:
                                                        user.role === "ADMIN"
                                                            ? "#2563eb"
                                                            : "#16a34a",

                                                    fontWeight: "700",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                {user.role}
                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td style={styles.td}>

                                            <Link
                                                to={`/users/edit/${user.id}`}
                                                style={{
                                                    ...styles.actionButton,
                                                    color: "#334155",
                                                }}
                                            >
                                                ✏️
                                            </Link>


                                            <button
                                                style={{
                                                    ...styles.actionButton,
                                                    color: "#334155",
                                                }}

                                                onClick={() => {

                                                    setSelectedUserId(
                                                        user.id
                                                    );

                                                    setShowModal(true);

                                                }}
                                            >
                                                🗑️
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )
                        }

                    </tbody>

                </table>

            </div>


            {/* DELETE MODAL */}

            <ConfirmModal
                isOpen={showModal}
                title="Delete User"
                message="Are you sure you want to delete this user?"
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
            />

        </Layout>

    );
}


const styles = {

    th: {
        padding: "17px 18px",
        textAlign: "left",
        fontSize: "13px",
        fontWeight: "700",
        color: "#64748b",
    },

    td: {
        padding: "17px 18px",
        fontSize: "14px",
    },

    actionButton: {
        marginRight: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "17px",
        textDecoration: "none",
    },

};


export default Users;