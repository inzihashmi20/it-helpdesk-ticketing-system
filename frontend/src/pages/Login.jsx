import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error("Please enter your email and password.");
            return;
        }

        try {

            setLoading(true);

            const response = await login({
                email,
                password,
            });

            localStorage.setItem("token", response.token);
            localStorage.setItem("id", response.id);
            localStorage.setItem("firstName", response.firstName);
            localStorage.setItem("lastName", response.lastName);
            localStorage.setItem("email", response.email);
            localStorage.setItem("role", response.role);

            toast.success("Welcome back!");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Invalid email or password."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                background:
                    "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #eef2ff 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* Decorative background elements */}

            <div
                style={{
                    position: "absolute",
                    width: "320px",
                    height: "320px",
                    borderRadius: "50%",
                    background: "rgba(37, 99, 235, 0.08)",
                    top: "-120px",
                    left: "-100px",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    background: "rgba(59, 130, 246, 0.07)",
                    bottom: "-120px",
                    right: "-80px",
                }}
            />

            <div
                style={{
                    width: "100%",
                    maxWidth: "430px",
                    position: "relative",
                    zIndex: 1,
                }}
            >

                {/* Brand */}

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "28px",
                    }}
                >

                    <div
                        style={{
                            width: "62px",
                            height: "62px",
                            margin: "0 auto 16px",
                            borderRadius: "18px",
                            background:
                                "linear-gradient(135deg, #2563eb, #1d4ed8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "30px",
                            boxShadow:
                                "0 10px 25px rgba(37, 99, 235, 0.25)",
                        }}
                    >
                        🛠️
                    </div>

                    <h1
                        style={{
                            margin: 0,
                            color: "#0f172a",
                            fontSize: "30px",
                            fontWeight: "750",
                            letterSpacing: "-0.5px",
                        }}
                    >
                        IT Helpdesk
                    </h1>

                    <p
                        style={{
                            marginTop: "8px",
                            marginBottom: 0,
                            color: "#64748b",
                            fontSize: "15px",
                        }}
                    >
                        Your support, managed simply.
                    </p>

                </div>


                {/* Login Card */}

                <div
                    style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "20px",
                        padding: "34px",
                        boxShadow:
                            "0 20px 50px rgba(15, 23, 42, 0.10)",
                    }}
                >

                    <div
                        style={{
                            marginBottom: "26px",
                        }}
                    >

                        <h2
                            style={{
                                margin: 0,
                                color: "#1e293b",
                                fontSize: "24px",
                                fontWeight: "700",
                            }}
                        >
                            Welcome back
                        </h2>

                        <p
                            style={{
                                marginTop: "7px",
                                marginBottom: 0,
                                color: "#64748b",
                                fontSize: "14px",
                                lineHeight: "1.5",
                            }}
                        >
                            Sign in to access your helpdesk dashboard.
                        </p>

                    </div>


                    <form onSubmit={handleLogin}>

                        {/* Email */}

                        <div
                            style={{
                                marginBottom: "18px",
                            }}
                        >

                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#334155",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Email Address
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        fontSize: "17px",
                                    }}
                                >
                                    ✉️
                                </span>

                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    autoComplete="email"
                                    disabled={loading}
                                    style={{
                                        width: "100%",
                                        height: "48px",
                                        padding:
                                            "0 14px 0 44px",
                                        border:
                                            "1px solid #cbd5e1",
                                        borderRadius: "10px",
                                        outline: "none",
                                        fontSize: "14px",
                                        color: "#1e293b",
                                        background: loading
                                            ? "#f8fafc"
                                            : "#ffffff",
                                        transition: "all 0.2s ease",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor =
                                            "#2563eb";
                                        e.target.style.boxShadow =
                                            "0 0 0 3px rgba(37, 99, 235, 0.10)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor =
                                            "#cbd5e1";
                                        e.target.style.boxShadow =
                                            "none";
                                    }}
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div
                            style={{
                                marginBottom: "24px",
                            }}
                        >

                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "8px",
                                    color: "#334155",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                Password
                            </label>

                            <div
                                style={{
                                    position: "relative",
                                }}
                            >

                                <span
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        fontSize: "17px",
                                    }}
                                >
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    autoComplete="current-password"
                                    disabled={loading}
                                    style={{
                                        width: "100%",
                                        height: "48px",
                                        padding:
                                            "0 14px 0 44px",
                                        border:
                                            "1px solid #cbd5e1",
                                        borderRadius: "10px",
                                        outline: "none",
                                        fontSize: "14px",
                                        color: "#1e293b",
                                        background: loading
                                            ? "#f8fafc"
                                            : "#ffffff",
                                        transition: "all 0.2s ease",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor =
                                            "#2563eb";
                                        e.target.style.boxShadow =
                                            "0 0 0 3px rgba(37, 99, 235, 0.10)";
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor =
                                            "#cbd5e1";
                                        e.target.style.boxShadow =
                                            "none";
                                    }}
                                />

                            </div>

                        </div>


                        {/* Login Button */}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                height: "50px",
                                border: "none",
                                borderRadius: "10px",
                                background: loading
                                    ? "#93c5fd"
                                    : "#2563eb",
                                color: "#ffffff",
                                fontSize: "15px",
                                fontWeight: "700",
                                cursor: loading
                                    ? "not-allowed"
                                    : "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: loading
                                    ? "none"
                                    : "0 8px 18px rgba(37, 99, 235, 0.22)",
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.background =
                                        "#1d4ed8";
                                    e.currentTarget.style.transform =
                                        "translateY(-1px)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.background =
                                        "#2563eb";
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                }
                            }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>

                </div>


                {/* Footer */}

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "24px",
                        color: "#94a3b8",
                        fontSize: "13px",
                    }}
                >
                    Secure access to your IT support workspace.
                </p>

            </div>

        </div>
    );
}

export default Login;