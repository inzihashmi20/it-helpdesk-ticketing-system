function ConfirmModal({

    isOpen,
    title,
    message,

    onConfirm,
    onCancel,

}) {

    if (!isOpen) return null;

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                zIndex: 999,
            }}
        >

            <div
                style={{
                    width: "430px",
                    background: "white",
                    borderRadius: "18px",
                    padding: "30px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        color: "#1e293b",
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        color: "#64748b",
                        lineHeight: "26px",
                    }}
                >
                    {message}
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "12px",
                        marginTop: "30px",
                    }}
                >

                    <button
                        onClick={onCancel}
                        style={{
                            padding: "12px 22px",
                            borderRadius: "10px",
                            border: "1px solid #cbd5e1",
                            background: "white",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        style={{
                            padding: "12px 22px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#dc2626",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;