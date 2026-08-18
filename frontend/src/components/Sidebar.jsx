import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/logout";

function Sidebar() {

    const location = useLocation();

    const role = localStorage.getItem("role");

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const isActive = (path) => {

        if (path === "/dashboard") {
            return location.pathname === "/dashboard";
        }

        return location.pathname.startsWith(path);
    };

    const menuItem = (path, icon, text) => {

        const active = isActive(path);

        return (
            <Link
                to={path}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                    padding: "13px 16px",
                    borderRadius: "11px",
                    textDecoration: "none",

                    color: active
                        ? "#ffffff"
                        : "#cbd5e1",

                    backgroundColor: active
                        ? "#2563eb"
                        : "transparent",

                    fontWeight: active
                        ? "600"
                        : "500",

                    fontSize: "15px",

                    boxShadow: active
                        ? "0 5px 14px rgba(37, 99, 235, 0.25)"
                        : "none",

                    transition:
                        "background-color 0.2s ease, " +
                        "color 0.2s ease, " +
                        "transform 0.2s ease",
                }}

                onMouseEnter={(e) => {

                    if (!active) {

                        e.currentTarget.style.backgroundColor =
                            "rgba(255,255,255,0.07)";

                        e.currentTarget.style.color =
                            "#ffffff";

                        e.currentTarget.style.transform =
                            "translateX(3px)";
                    }
                }}

                onMouseLeave={(e) => {

                    if (!active) {

                        e.currentTarget.style.backgroundColor =
                            "transparent";

                        e.currentTarget.style.color =
                            "#cbd5e1";

                        e.currentTarget.style.transform =
                            "translateX(0)";
                    }
                }}
            >

                <span
                    style={{
                        width: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "17px",
                    }}
                >
                    {icon}
                </span>

                <span>
                    {text}
                </span>

            </Link>
        );
    };

    return (

        <>

            <aside
                style={{
                    width: "260px",
                    height: "100vh",

                    background:
                        "linear-gradient(180deg, #1e293b 0%, #172033 100%)",

                    color: "white",

                    display: "flex",
                    flexDirection: "column",

                    padding: "24px 16px",

                    boxSizing: "border-box",

                    flexShrink: 0,

                    position: "sticky",
                    top: 0,

                    overflow: "hidden",
                }}
            >

                {/* BRAND */}

                <div
                    style={{
                        padding: "4px 8px 32px",
                        borderBottom:
                            "1px solid rgba(255,255,255,0.07)",
                        marginBottom: "24px",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "11px",
                        }}
                    >

                        <div
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "10px",

                                background:
                                    "linear-gradient(135deg, #2563eb, #3b82f6)",

                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                                fontSize: "19px",

                                boxShadow:
                                    "0 5px 14px rgba(37,99,235,0.25)",
                            }}
                        >
                            🛠
                        </div>

                        <div>

                            <div
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#ffffff",
                                    lineHeight: "1.2",
                                }}
                            >
                                IT Helpdesk
                            </div>

                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "#94a3b8",
                                    marginTop: "4px",
                                }}
                            >
                                Support workspace
                            </div>

                        </div>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                    }}
                >

                    <div
                        style={{
                            padding: "0 10px 8px",
                            fontSize: "11px",
                            fontWeight: "700",
                            color: "#64748b",
                            textTransform: "uppercase",
                            letterSpacing: "0.8px",
                        }}
                    >
                        Workspace
                    </div>

                    {menuItem(
                        "/dashboard",
                        "🏠",
                        "Dashboard"
                    )}

                    {menuItem(
                        "/tickets",
                        "🎫",
                        "Tickets"
                    )}

                    {role === "ADMIN" &&
                        menuItem(
                            "/users",
                            "👥",
                            "Users"
                        )
                    }

                    {menuItem(
                        "/settings",
                        "⚙️",
                        "Settings"
                    )}

                </nav>


                {/* SPACER */}

                <div
                    style={{
                        flex: 1,
                    }}
                />


                {/* LOGOUT */}

                <div
                    style={{
                        borderTop:
                            "1px solid rgba(255,255,255,0.07)",
                        paddingTop: "16px",
                    }}
                >

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        style={{
                            width: "100%",

                            display: "flex",
                            alignItems: "center",
                            gap: "13px",

                            padding: "13px 16px",

                            borderRadius: "11px",
                            border: "none",

                            background: "transparent",

                            color: "#fca5a5",

                            fontWeight: "600",
                            fontSize: "15px",

                            cursor: "pointer",

                            textAlign: "left",

                            transition:
                                "background-color 0.2s ease, color 0.2s ease",
                        }}

                        onMouseEnter={(e) => {

                            e.currentTarget.style.backgroundColor =
                                "rgba(248,113,113,0.10)";

                            e.currentTarget.style.color =
                                "#fecaca";
                        }}

                        onMouseLeave={(e) => {

                            e.currentTarget.style.backgroundColor =
                                "transparent";

                            e.currentTarget.style.color =
                                "#fca5a5";
                        }}
                    >

                        <span
                            style={{
                                width: "24px",
                                display: "flex",
                                justifyContent: "center",
                                fontSize: "17px",
                            }}
                        >
                            🚪
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* LOGOUT MODAL */}

            {showLogoutModal && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,

                        backgroundColor:
                            "rgba(15, 23, 42, 0.45)",

                        backdropFilter: "blur(4px)",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        zIndex: 9999,

                        padding: "20px",
                    }}
                >

                    <div
                        style={{
                            width: "100%",
                            maxWidth: "420px",

                            backgroundColor: "#ffffff",

                            borderRadius: "18px",

                            padding: "30px",

                            boxShadow:
                                "0 25px 60px rgba(15,23,42,0.20)",

                            animation:
                                "logoutModalIn 0.2s ease-out",
                        }}
                    >

                        {/* ICON */}

                        <div
                            style={{
                                width: "52px",
                                height: "52px",

                                borderRadius: "14px",

                                backgroundColor: "#fef2f2",

                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",

                                fontSize: "24px",

                                marginBottom: "18px",
                            }}
                        >
                            🚪
                        </div>


                        <h2
                            style={{
                                margin: "0 0 8px",

                                color: "#1e293b",

                                fontSize: "23px",

                                fontWeight: "700",
                            }}
                        >
                            Log out?
                        </h2>


                        <p
                            style={{
                                margin: "0 0 25px",

                                color: "#64748b",

                                fontSize: "15px",

                                lineHeight: "1.6",
                            }}
                        >
                            Are you sure you want to log out of your
                            IT Helpdesk account?
                        </p>


                        {/* ACTIONS */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "12px",
                            }}
                        >

                            <button
                                onClick={() =>
                                    setShowLogoutModal(false)
                                }
                                style={{
                                    padding: "11px 20px",

                                    borderRadius: "10px",

                                    border:
                                        "1px solid #cbd5e1",

                                    backgroundColor: "#ffffff",

                                    color: "#334155",

                                    fontWeight: "600",

                                    fontSize: "14px",

                                    cursor: "pointer",
                                }}
                            >
                                Cancel
                            </button>


                            <button
                                onClick={logout}
                                style={{
                                    padding: "11px 20px",

                                    borderRadius: "10px",

                                    border: "none",

                                    backgroundColor: "#ef4444",

                                    color: "#ffffff",

                                    fontWeight: "600",

                                    fontSize: "14px",

                                    cursor: "pointer",

                                    boxShadow:
                                        "0 4px 12px rgba(239,68,68,0.20)",
                                }}
                            >
                                Log out
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default Sidebar;