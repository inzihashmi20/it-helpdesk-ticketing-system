import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Layout from "../components/Layout";
import UserForm from "../components/UserForm";

import {
    getUserById,
    updateUser,
} from "../services/userService";


function EditUser() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");


    // =========================================================
    // LOAD USER
    // =========================================================

    useEffect(() => {

        loadUser();

    }, [id]);


    const loadUser = async () => {

        try {

            const user = await getUserById(id);

            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);

        } catch (error) {

            console.error(error);

            toast.error("Failed to load user.");

        }

    };


    // =========================================================
    // UPDATE USER
    // =========================================================

    const handleUpdateUser = async () => {

        try {

            await updateUser(id, {

                firstName,
                lastName,
                email,

            });

            toast.success(
                "User updated successfully!"
            );

            navigate("/users");

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to update user."
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
                    Edit User
                </h2>


                <p
                    style={{
                        color: "#64748b",
                        marginBottom: "30px",
                    }}
                >
                    Update user information.
                </p>


                <UserForm

                    firstName={firstName}
                    setFirstName={setFirstName}

                    lastName={lastName}
                    setLastName={setLastName}

                    email={email}
                    setEmail={setEmail}

                    /*
                     * Editing an existing user should NOT
                     * show password or role fields.
                     */
                    showCredentials={false}

                    buttonText="Update User"

                    onSubmit={handleUpdateUser}

                />

            </div>

        </Layout>

    );

}


export default EditUser;