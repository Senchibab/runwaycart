import { useAuth } from '../context/AuthContext';

function HomePage() {

    const { logout, token } = useAuth();
    return (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "#111a2b", minHeight: "100vh", color: "#cfd8f5", fontFamily: "Inter, sans-serif" }}>
            <h1 className="heading-primary">Welcome to RunwayCart</h1>
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Your token: <code>{token}</code></p>
            <button className="primary-btn" onClick={logout}>Logout</button>
        </div>
    )

}

export default HomePage
