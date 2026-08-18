function Navbar({ title }) {

    const firstName = localStorage.getItem("firstName") || "User";
    const lastName = localStorage.getItem("lastName") || "";
    const role = localStorage.getItem("role") || "";

    const initials =
        (firstName.charAt(0) + (lastName.charAt(0) || "")).toUpperCase();

    const hour = new Date().getHours();

    let greeting;

    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    return (

        <div
            style={{
                minHeight: "80px",
                backgroundColor: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 40px",
                borderBottom: "1px solid #e2e8f0",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
            }}
        >

            {/* LEFT SIDE */}
            <div>

                <div
                    style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#64748b",
                        marginBottom: "2px",
                        lineHeight: "1.4",
                    }}
                >
                    {greeting} 👋
                </div>

                <div
                    style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#1e293b",
                        lineHeight: "1.4",
                    }}
                >
                    {firstName}, welcome back!
                </div>

            </div>


            {/* RIGHT SIDE */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                }}
            >

                {/* USER INFO */}
                <div
                    style={{
                        textAlign: "right",
                    }}
                >

                    <div
                        style={{
                            fontWeight: "700",
                            color: "#1e293b",
                            fontSize: "15px",
                        }}
                    >
                        {firstName} {lastName}
                    </div>

                    <span
                        style={{
                            display: "inline-block",
                            marginTop: "4px",
                            padding: "3px 10px",
                            borderRadius: "20px",
                            backgroundColor:
                                role === "ADMIN"
                                    ? "#dbeafe"
                                    : "#dcfce7",
                            color:
                                role === "ADMIN"
                                    ? "#2563eb"
                                    : "#16a34a",
                            fontSize: "11px",
                            fontWeight: "700",
                            letterSpacing: "0.3px",
                        }}
                    >
                        {role}
                    </span>

                </div>


                {/* AVATAR */}
                <div
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, #2563eb, #3b82f6)",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "700",
                        fontSize: "17px",
                        boxShadow:
                            "0 4px 12px rgba(37,99,235,0.20)",
                    }}
                >
                    {initials}
                </div>

            </div>

        </div>

    );
}

export default Navbar;