function UserForm({

    firstName,
    setFirstName,

    lastName,
    setLastName,

    email,
    setEmail,

    password,
    setPassword,

    role,
    setRole,

    showCredentials = true,

    buttonText,
    onSubmit,

}) {

    return (

        <div
            style={{
                background: "white",
                borderRadius: "16px",
                padding: "30px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            }}
        >

            {/* FIRST NAME */}

            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={inputStyle}
            />


            {/* LAST NAME */}

            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                    ...inputStyle,
                    marginTop: "18px",
                }}
            />


            {/* EMAIL */}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                    ...inputStyle,
                    marginTop: "18px",
                }}
            />


            {/* PASSWORD + ROLE */}

            {showCredentials && (
                <>

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        style={{
                            ...inputStyle,
                            marginTop: "18px",
                        }}
                    />


                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                        style={{
                            ...inputStyle,
                            marginTop: "18px",
                        }}
                    >

                        <option value="EMPLOYEE">
                            Employee
                        </option>

                        <option value="ADMIN">
                            Admin
                        </option>

                    </select>

                </>
            )}


            {/* BUTTON */}

            <button
                onClick={onSubmit}
                style={{
                    marginTop: "25px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "15px",
                    transition: "0.25s",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                        "#1d4ed8";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                        "#2563eb";
                }}
            >
                {buttonText}
            </button>

        </div>

    );

}


const inputStyle = {

    width: "100%",

    padding: "14px",

    borderRadius: "8px",

    border: "1px solid #cbd5e1",

    fontSize: "15px",

    boxSizing: "border-box",

};


export default UserForm;