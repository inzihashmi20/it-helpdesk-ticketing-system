import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import UserForm from "../components/UserForm";

import { createUser } from "../services/userService";


function CreateUser() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("EMPLOYEE");


    // =========================================================
    // CREATE USER
    // =========================================================

    const handleCreateUser = async () => {

        try {

            await createUser({

                firstName,
                lastName,
                email,
                password,
                role,

            });

            toast.success(
                "User created successfully!"
            );

            navigate("/users");

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to create user."
            );

        }

    };


    // =========================================================
    // UI
    // =========================================================

    return (

        <Layout>

            <div
                style={{
                    maxWidth: "720px",
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        color: "#1e293b",
                    }}
                >
                    Create User
                </h2>


                <p
                    style={{
                        color: "#64748b",
                        marginBottom: "30px",
                    }}
                >
                    Create a new administrator or employee.
                </p>


                <UserForm

                    firstName={firstName}
                    setFirstName={setFirstName}

                    lastName={lastName}
                    setLastName={setLastName}

                    email={email}
                    setEmail={setEmail}

                    password={password}
                    setPassword={setPassword}

                    role={role}
                    setRole={setRole}

                    /*
                     * Creating a user requires
                     * password and role.
                     */
                    showCredentials={true}

                    buttonText="Create User"

                    onSubmit={handleCreateUser}

                />

            </div>

        </Layout>

    );

}


export default CreateUser;