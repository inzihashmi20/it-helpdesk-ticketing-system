import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ title, children }) {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "#f8fafc",
            }}
        >
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                }}
            >
                <Navbar title={title} />

                <main
                    className="page-transition"
                    style={{
                        padding: "35px",
                        flex: 1,
                        backgroundColor: "#f8fafc",
                    }}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}

export default Layout;