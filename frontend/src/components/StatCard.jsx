import { useNavigate } from "react-router-dom";

function StatCard({
    title,
    value,
    path,
    icon,
    accent = "#2563eb",
}) {

    const navigate = useNavigate();

    return (

        <div
            onClick={() => path && navigate(path)}

            onMouseEnter={(e) => {

                if (path) {

                    e.currentTarget.style.transform =
                        "translateY(-4px)";

                    e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(15, 23, 42, 0.10)";
                }

            }}

            onMouseLeave={(e) => {

                if (path) {

                    e.currentTarget.style.transform =
                        "translateY(0)";

                    e.currentTarget.style.boxShadow =
                        "0 2px 10px rgba(15, 23, 42, 0.06)";
                }

            }}

            style={{
                position: "relative",
                background: "#ffffff",
                padding: "22px",
                borderRadius: "14px",
                border: "1px solid #e2e8f0",
                boxShadow:
                    "0 2px 10px rgba(15, 23, 42, 0.06)",
                cursor: path ? "pointer" : "default",
                transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                overflow: "hidden",
            }}
        >

            {/* Accent bar */}

            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: accent,
                }}
            />


            {/* Icon */}

            <div
                style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: `${accent}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "21px",
                    marginBottom: "18px",
                }}
            >
                {icon}
            </div>


            {/* Title */}

            <p
                style={{
                    margin: 0,
                    marginBottom: "8px",
                    color: "#64748b",
                    fontSize: "14px",
                    fontWeight: "600",
                }}
            >
                {title}
            </p>


            {/* Number */}

            <h1
                style={{
                    margin: 0,
                    color: "#0f172a",
                    fontSize: "36px",
                    lineHeight: "1",
                    fontWeight: "700",
                }}
            >
                {value}
            </h1>


            {/* Click hint */}

            {path && (

                <div
                    style={{
                        marginTop: "16px",
                        color: accent,
                        fontSize: "12px",
                        fontWeight: "600",
                    }}
                >
                    View tickets →
                </div>

            )}

        </div>

    );

}

export default StatCard;