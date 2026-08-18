import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import ViewTicket from "./pages/ViewTicket";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import EditTicket from "./pages/EditTicket";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (

        <Routes>

            {/* Public Route */}
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                }
            />


            <Route
                path="/settings"
                element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                }
            />



            <Route
                path="/tickets"
                element={
                    <PrivateRoute>
                        <Tickets />
                    </PrivateRoute>
                }
            />

            <Route
                path="/tickets/create"
                element={
                    <PrivateRoute>
                        <CreateTicket />
                    </PrivateRoute>
                }
            />

            <Route
                path="/tickets/edit/:id"
                element={
                    <PrivateRoute>
                        <EditTicket />
                    </PrivateRoute>
                }
            />
            <Route
                path="/tickets/view/:id"
                element={
                    <PrivateRoute>
                        <ViewTicket />
                    </PrivateRoute>
                }
            />

            <Route
                path="/users"
                element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                }
            />

            <Route
                path="/users/create"
                element={
                    <PrivateRoute>
                        <CreateUser />
                    </PrivateRoute>
                }
            />

            <Route
                path="/users/edit/:id"
                element={
                    <PrivateRoute>
                        <EditUser />
                    </PrivateRoute>
                }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

        </Routes>

    );
}

export default App;