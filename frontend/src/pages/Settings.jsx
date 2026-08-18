import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Layout from "../components/Layout";

import {
    getUserById,
    updateUser,
    changePassword,
} from "../services/userService";


function Settings() {

    const userId =
        localStorage.getItem("id");

    const currentStoredEmail =
        localStorage.getItem("email") || "";


    // =========================================================
    // PROFILE STATE
    // =========================================================

    const [firstName, setFirstName] =
        useState("");

    const [lastName, setLastName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [role, setRole] =
        useState("USER");

    const [editing, setEditing] =
        useState(false);

    const [saving, setSaving] =
        useState(false);

    const [loading, setLoading] =
        useState(true);


    const [formData, setFormData] =
        useState({
            firstName: "",
            lastName: "",
            email: "",
        });


    // =========================================================
    // PASSWORD STATE
    // =========================================================

    const [passwordForm, setPasswordForm] =
        useState({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    const [changingPassword, setChangingPassword] =
        useState(false);


    // =========================================================
    // LOAD CURRENT USER
    // =========================================================

    useEffect(() => {

        const loadUser = async () => {

            if (!userId) {

                toast.error(
                    "User ID not found. Please login again."
                );

                setLoading(false);

                return;
            }

            try {

                const user =
                    await getUserById(userId);

                setFirstName(
                    user.firstName || ""
                );

                setLastName(
                    user.lastName || ""
                );

                setEmail(
                    user.email || ""
                );

                setRole(
                    user.role || "USER"
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to load profile."
                );

            } finally {

                setLoading(false);
            }
        };

        loadUser();

    }, [userId]);


    // =========================================================
    // PROFILE INPUT
    // =========================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // =========================================================
    // PROFILE EDIT
    // =========================================================

    const handleEdit = () => {

        setFormData({

            firstName,
            lastName,
            email,

        });

        setEditing(true);
    };


    // =========================================================
    // PROFILE CANCEL
    // =========================================================

    const handleCancel = () => {

        setFormData({

            firstName,
            lastName,
            email,

        });

        setEditing(false);
    };


    // =========================================================
    // CLEAR SESSION
    // =========================================================

    const clearSession = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        window.location.href = "/";
    };


    // =========================================================
    // UPDATE PROFILE
    // =========================================================

    const handleSave = async () => {

        if (!userId) {

            toast.error(
                "User ID not found. Please login again."
            );

            return;
        }

        if (
            !formData.firstName.trim() ||
            !formData.lastName.trim() ||
            !formData.email.trim()
        ) {

            toast.error(
                "Please fill all fields."
            );

            return;
        }

        try {

            setSaving(true);

            const newEmail =
                formData.email.trim();

            const oldEmail =
                currentStoredEmail
                    .trim()
                    .toLowerCase();

            const emailChanged =
                newEmail.toLowerCase() !== oldEmail;


            const updatedUser =
                await updateUser(
                    userId,
                    {
                        firstName:
                            formData.firstName.trim(),

                        lastName:
                            formData.lastName.trim(),

                        email: newEmail,
                    }
                );


            // =================================================
            // EMAIL CHANGED
            // =================================================

            if (emailChanged) {

                clearSession();

                window.alert(
                    "Email updated successfully. Please login again using your new email."
                );

                return;
            }


            // =================================================
            // UPDATE LOCAL SESSION DATA
            // =================================================

            localStorage.setItem(
                "firstName",
                updatedUser.firstName
            );

            localStorage.setItem(
                "lastName",
                updatedUser.lastName
            );

            localStorage.setItem(
                "email",
                updatedUser.email
            );


            setFirstName(
                updatedUser.firstName
            );

            setLastName(
                updatedUser.lastName
            );

            setEmail(
                updatedUser.email
            );

            setEditing(false);

            toast.success(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(
                "PROFILE UPDATE ERROR:",
                error?.response?.data ||
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSaving(false);
        }
    };


    // =========================================================
    // PASSWORD INPUT
    // =========================================================

    const handlePasswordChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setPasswordForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

// =========================================================
// CHANGE PASSWORD
// =========================================================

const handleChangePassword = async () => {

    const {
        currentPassword,
        newPassword,
        confirmPassword,
    } = passwordForm;


    if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
    ) {

        toast.error(
            "Please fill all password fields."
        );

        return;
    }


    if (newPassword.length < 6) {

        toast.error(
            "New password must be at least 6 characters."
        );

        return;
    }


    if (newPassword !== confirmPassword) {

        toast.error(
            "New passwords do not match."
        );

        return;
    }


    try {

        setChangingPassword(true);

        await changePassword(
            userId,
            {
                currentPassword,
                newPassword,
                confirmPassword,
            }
        );


        // Clear password fields
        setPasswordForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });


        // Show proper application toast
        toast.success(
            "Password changed successfully!",
            {
                duration: 1800,
            }
        );


        /*
         * Give the toast enough time to be visible,
         * then force a fresh login.
         */
        setTimeout(() => {

            clearSession();

        }, 1800);


    } catch (error) {

        console.error(
            "PASSWORD CHANGE ERROR:",
            error?.response?.data ||
            error
        );

        toast.error(
            error?.response?.data?.message ||
            "Failed to change password."
        );

    } finally {

        setChangingPassword(false);
    }
};


    // =========================================================
    // CLEAR PASSWORD FORM
    // =========================================================

    const handleClearPasswordForm = () => {

        setPasswordForm({

            currentPassword: "",
            newPassword: "",
            confirmPassword: "",

        });
    };


    const fullName =
        `${firstName} ${lastName}`.trim();


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <Layout>

                <div
                    style={{
                        padding: "40px",
                        color: "#64748b",
                    }}
                >
                    Loading profile...
                </div>

            </Layout>
        );
    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <Layout>

            <div
                style={{
                    maxWidth: "1180px",
                    margin: "0 auto",
                }}
            >

                {/* PAGE HEADER */}

                <div
                    style={{
                        marginBottom: "28px",
                    }}
                >

                    <div
                        style={{
                            fontSize: "13px",
                            fontWeight: "700",
                            color: "#2563eb",
                            marginBottom: "7px",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                        }}
                    >
                        Account
                    </div>

                    <h2
                        style={{
                            margin: 0,
                            fontSize: "38px",
                            lineHeight: "1.15",
                            fontWeight: "750",
                            color: "#172033",
                        }}
                    >
                        Settings
                    </h2>

                    <p
                        style={{
                            margin: "9px 0 0",
                            color: "#64748b",
                            fontSize: "15px",
                        }}
                    >
                        Manage your account information and security.
                    </p>

                </div>


                {/* =================================================
                    ACCOUNT CARD
                ================================================= */}

                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "18px",
                        padding: "28px",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                            "0 8px 25px rgba(15,23,42,0.06)",
                        maxWidth: "760px",
                        marginBottom: "24px",
                    }}
                >

                    {/* CARD HEADER */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "26px",
                            gap: "20px",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                            }}
                        >

                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "14px",
                                    background: "#eef2ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "22px",
                                }}
                            >
                                👤
                            </div>

                            <div>

                                <h3
                                    style={{
                                        margin: 0,
                                        fontSize: "19px",
                                        color: "#172033",
                                    }}
                                >
                                    Account
                                </h3>

                                <p
                                    style={{
                                        margin: "4px 0 0",
                                        fontSize: "13px",
                                        color: "#64748b",
                                    }}
                                >
                                    Your account information.
                                </p>

                            </div>

                        </div>


                        {!editing && (

                            <button
                                onClick={handleEdit}
                                style={{
                                    background: "#2563eb",
                                    color: "#ffffff",
                                    border: "none",
                                    padding: "10px 18px",
                                    borderRadius: "9px",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                ✏️ Edit
                            </button>

                        )}

                    </div>


                    {/* PROFILE EDIT */}

                    {editing ? (

                        <div>

                            {/* FIRST NAME */}

                            <div
                                style={{
                                    marginBottom: "18px",
                                }}
                            >

                                <label
                                    style={labelStyle}
                                >
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />

                            </div>


                            {/* LAST NAME */}

                            <div
                                style={{
                                    marginBottom: "18px",
                                }}
                            >

                                <label
                                    style={labelStyle}
                                >
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />

                            </div>


                            {/* EMAIL */}

                            <div
                                style={{
                                    marginBottom: "22px",
                                }}
                            >

                                <label
                                    style={labelStyle}
                                >
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />

                            </div>


                            {/* PROFILE BUTTONS */}

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >

                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    style={{
                                        background:
                                            saving
                                                ? "#93c5fd"
                                                : "#2563eb",
                                        color: "#ffffff",
                                        border: "none",
                                        padding: "11px 20px",
                                        borderRadius: "9px",
                                        cursor:
                                            saving
                                                ? "not-allowed"
                                                : "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>


                                <button
                                    onClick={handleCancel}
                                    disabled={saving}
                                    style={{
                                        background: "#f1f5f9",
                                        color: "#334155",
                                        border: "none",
                                        padding: "11px 20px",
                                        borderRadius: "9px",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    ) : (

                        /* PROFILE VIEW */

                        <div>

                            {/* FULL NAME */}

                            <div
                                style={{
                                    padding: "15px 0",
                                    borderBottom:
                                        "1px solid #e2e8f0",
                                }}
                            >

                                <div
                                    style={fieldLabelStyle}
                                >
                                    Full Name
                                </div>

                                <div
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "650",
                                        color: "#172033",
                                    }}
                                >
                                    {fullName}
                                </div>

                            </div>


                            {/* EMAIL */}

                            <div
                                style={{
                                    padding: "15px 0",
                                    borderBottom:
                                        "1px solid #e2e8f0",
                                }}
                            >

                                <div
                                    style={fieldLabelStyle}
                                >
                                    Email Address
                                </div>

                                <div
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        color: "#172033",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {email}
                                </div>

                            </div>


                            {/* ROLE */}

                            <div
                                style={{
                                    paddingTop: "15px",
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#64748b",
                                        marginBottom: "8px",
                                    }}
                                >
                                    Account Role
                                </div>

                                <span
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        padding: "6px 12px",
                                        borderRadius: "999px",
                                        background:
                                            role === "ADMIN"
                                                ? "#dbeafe"
                                                : "#dcfce7",
                                        color:
                                            role === "ADMIN"
                                                ? "#2563eb"
                                                : "#16a34a",
                                        fontSize: "12px",
                                        fontWeight: "800",
                                        letterSpacing: "0.03em",
                                    }}
                                >
                                    {role}
                                </span>

                            </div>

                        </div>

                    )}

                </div>


                {/* =================================================
                    SECURITY CARD
                ================================================= */}

                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "18px",
                        padding: "28px",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                            "0 8px 25px rgba(15,23,42,0.06)",
                        maxWidth: "760px",
                    }}
                >

                    {/* SECURITY HEADER */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                            marginBottom: "26px",
                        }}
                    >

                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "14px",
                                background: "#f0fdf4",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "22px",
                            }}
                        >
                            🔐
                        </div>

                        <div>

                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: "19px",
                                    color: "#172033",
                                }}
                            >
                                Security
                            </h3>

                            <p
                                style={{
                                    margin: "4px 0 0",
                                    fontSize: "13px",
                                    color: "#64748b",
                                }}
                            >
                                Change your account password.
                            </p>

                        </div>

                    </div>


                    {/* CURRENT PASSWORD */}

                    <div
                        style={{
                            marginBottom: "18px",
                        }}
                    >

                        <label
                            style={labelStyle}
                        >
                            Current Password
                        </label>

                        <input
                            type="password"
                            name="currentPassword"
                            value={
                                passwordForm.currentPassword
                            }
                            onChange={handlePasswordChange}
                            placeholder="Enter your current password"
                            style={inputStyle}
                        />

                    </div>


                    {/* NEW PASSWORD */}

                    <div
                        style={{
                            marginBottom: "18px",
                        }}
                    >

                        <label
                            style={labelStyle}
                        >
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            value={
                                passwordForm.newPassword
                            }
                            onChange={handlePasswordChange}
                            placeholder="Enter your new password"
                            style={inputStyle}
                        />

                        <div
                            style={{
                                marginTop: "6px",
                                fontSize: "12px",
                                color: "#94a3b8",
                            }}
                        >
                            Minimum 6 characters.
                        </div>

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div
                        style={{
                            marginBottom: "22px",
                        }}
                    >

                        <label
                            style={labelStyle}
                        >
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={
                                passwordForm.confirmPassword
                            }
                            onChange={handlePasswordChange}
                            placeholder="Confirm your new password"
                            style={inputStyle}
                        />

                    </div>


                    {/* PASSWORD BUTTONS */}

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >

                        <button
                            onClick={handleChangePassword}
                            disabled={changingPassword}
                            style={{
                                background:
                                    changingPassword
                                        ? "#93c5fd"
                                        : "#2563eb",
                                color: "#ffffff",
                                border: "none",
                                padding: "11px 20px",
                                borderRadius: "9px",
                                cursor:
                                    changingPassword
                                        ? "not-allowed"
                                        : "pointer",
                                fontWeight: "600",
                            }}
                        >
                            {changingPassword
                                ? "Changing..."
                                : "Change Password"}
                        </button>


                        <button
                            onClick={
                                handleClearPasswordForm
                            }
                            disabled={changingPassword}
                            style={{
                                background: "#f1f5f9",
                                color: "#334155",
                                border: "none",
                                padding: "11px 20px",
                                borderRadius: "9px",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            Clear
                        </button>

                    </div>

                </div>

            </div>

        </Layout>
    );
}


const labelStyle = {

    display: "block",

    fontSize: "12px",

    color: "#64748b",

    marginBottom: "7px",

};


const fieldLabelStyle = {

    fontSize: "12px",

    color: "#64748b",

    marginBottom: "6px",

};


const inputStyle = {

    width: "100%",

    padding: "11px 13px",

    borderRadius: "9px",

    border: "1px solid #cbd5e1",

    fontSize: "15px",

    boxSizing: "border-box",

    outline: "none",

};


export default Settings;