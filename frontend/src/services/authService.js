import api from "../api/api";

export const login = async (loginRequest) => {

    const response = await api.post(
        "/auth/login",
        loginRequest
    );

    return response.data;
};