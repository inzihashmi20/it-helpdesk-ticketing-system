function TicketForm({
    title,
    setTitle,

    description,
    setDescription,

    priority,
    setPriority,

    buttonText,
    onSubmit,
}) {

    const wordCount = description
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const isAtLimit = wordCount >= 200;

    const handleDescriptionChange = (e) => {

        const value = e.target.value;

        const words = value
            .trim()
            .split(/\s+/)
            .filter(Boolean);

        if (words.length <= 200) {
            setDescription(value);
        }
    };

    return (

        <div
            style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "32px",
                border: "1px solid #e2e8f0",
                boxShadow:
                    "0 8px 25px rgba(15, 23, 42, 0.06)",
            }}
        >

            {/* FORM HEADER */}

            <div
                style={{
                    marginBottom: "28px",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >

                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "12px",
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                    >
                        🎫
                    </div>

                    <div>

                        <h3
                            style={{
                                margin: 0,
                                color: "#1e293b",
                                fontSize: "19px",
                                fontWeight: "700",
                            }}
                        >
                            Ticket Details
                        </h3>

                        <p
                            style={{
                                margin: "4px 0 0",
                                color: "#64748b",
                                fontSize: "13px",
                            }}
                        >
                            Provide the information needed to handle
                            this support request.
                        </p>

                    </div>

                </div>

            </div>


            {/* TITLE */}

            <div
                style={{
                    marginBottom: "20px",
                }}
            >

                <label style={labelStyle}>
                    Ticket Title
                </label>

                <input
                    type="text"
                    placeholder="e.g. Laptop display not working"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                            "#2563eb";

                        e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(37,99,235,0.10)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                            "#cbd5e1";

                        e.currentTarget.style.boxShadow =
                            "none";
                    }}
                />

            </div>


            {/* DESCRIPTION */}

            <div
                style={{
                    marginBottom: "20px",
                }}
            >

                <label style={labelStyle}>
                    Description
                </label>

                <textarea
                    rows="6"
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{
                        ...inputStyle,

                        resize: "vertical",
                        minHeight: "140px",
                        lineHeight: "1.6",

                        borderColor:
                            isAtLimit
                                ? "#f59e0b"
                                : "#cbd5e1",
                    }}

                    onFocus={(e) => {

                        e.currentTarget.style.borderColor =
                            isAtLimit
                                ? "#f59e0b"
                                : "#2563eb";

                        e.currentTarget.style.boxShadow =
                            isAtLimit
                                ? "0 0 0 3px rgba(245,158,11,0.10)"
                                : "0 0 0 3px rgba(37,99,235,0.10)";
                    }}

                    onBlur={(e) => {

                        e.currentTarget.style.borderColor =
                            isAtLimit
                                ? "#f59e0b"
                                : "#cbd5e1";

                        e.currentTarget.style.boxShadow =
                            "none";
                    }}
                />

                <div
                    style={{
                        marginTop: "7px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "15px",
                        fontSize: "12px",
                    }}
                >

                    <span
                        style={{
                            color: "#94a3b8",
                            lineHeight: "1.5",
                        }}
                    >
                        Include useful details such as error messages,
                        symptoms, or when the issue started.
                    </span>

                    <span
                        style={{
                            color:
                                isAtLimit
                                    ? "#d97706"
                                    : "#64748b",

                            fontWeight: "700",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {wordCount} / 200 words
                    </span>

                </div>

                {isAtLimit && (
                    <div
                        style={{
                            marginTop: "6px",
                            color: "#d97706",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        Maximum 200 words reached.
                    </div>
                )}

            </div>


            {/* PRIORITY */}

            <div
                style={{
                    marginBottom: "28px",
                }}
            >

                <label style={labelStyle}>
                    Priority
                </label>

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(e.target.value)
                    }
                    style={{
                        ...inputStyle,
                        cursor: "pointer",
                    }}
                >

                    <option value="LOW">
                        Low — General issue
                    </option>

                    <option value="MEDIUM">
                        Medium — Needs attention
                    </option>

                    <option value="HIGH">
                        High — Urgent issue
                    </option>

                </select>

            </div>


            {/* ACTION */}

            <div
                style={{
                    paddingTop: "22px",
                    borderTop: "1px solid #e2e8f0",
                }}
            >

                <button
                    onClick={onSubmit}
                    style={{
                        width: "100%",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "14px 24px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "650",
                        fontSize: "15px",
                        boxShadow:
                            "0 6px 15px rgba(37,99,235,0.20)",
                        transition:
                            "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                    }}

                    onMouseEnter={(e) => {

                        e.currentTarget.style.background =
                            "#1d4ed8";

                        e.currentTarget.style.transform =
                            "translateY(-1px)";

                        e.currentTarget.style.boxShadow =
                            "0 8px 18px rgba(37,99,235,0.25)";
                    }}

                    onMouseLeave={(e) => {

                        e.currentTarget.style.background =
                            "#2563eb";

                        e.currentTarget.style.transform =
                            "translateY(0)";

                        e.currentTarget.style.boxShadow =
                            "0 6px 15px rgba(37,99,235,0.20)";
                    }}
                >
                    {buttonText}
                </button>

            </div>

        </div>

    );
}


const labelStyle = {

    display: "block",

    marginBottom: "8px",

    color: "#334155",

    fontSize: "13px",

    fontWeight: "700",

};


const inputStyle = {

    width: "100%",

    padding: "13px 14px",

    borderRadius: "10px",

    border: "1px solid #cbd5e1",

    background: "#ffffff",

    color: "#1e293b",

    fontSize: "15px",

    boxSizing: "border-box",

    outline: "none",

    transition:
        "border-color 0.2s ease, box-shadow 0.2s ease",

};


export default TicketForm;