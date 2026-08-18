import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});


// =========================================================
// REQUEST INTERCEPTOR
// =========================================================

api.interceptors.request.use(
    (config) => {

        // Login is public.
        // Never attach an old JWT to the login request.
        if (config.url === "/auth/login") {
            return config;
        }

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(

    // Successful response
    (response) => {
        return response;
    },

    // Failed response
    (error) => {

        const status = error?.response?.status;
        const url = error?.config?.url;

        /*
         * If the backend returns 401, the current JWT
         * is no longer valid.
         *
         * Do not do this for login because an invalid
         * login should simply show an error message.
         */
        if (
            status === 401 &&
            url !== "/auth/login"
        ) {

            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("email");
            localStorage.removeItem("role");

            // Your Login page is registered at "/"
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);


export default api;