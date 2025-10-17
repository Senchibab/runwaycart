import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NoPageFound() {

    const nav = useNavigate();
    const { isAuthenticated, token } = useAuth();

    const handleRedirect = () => {

        if (isAuthenticated && token) {
            nav("/home");
        }
        else {
            nav("/");
        }

    }


    return (
        <div style={{ textAlign: "center", padding: "4rem", backgroundColor: "#111a2b", minHeight: "100vh", color: "#cfd8f5", fontFamily: "Inter, sans-serif" }}>
            <h1 style={{ fontSize: "3rem" }}>404</h1>
            <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
                Sorry, this page doesn't exist.
            </p>
            <button onClick={handleRedirect} className="primary-btn" aria-label={isAuthenticated ? "Go to home page" : "Go to main page"}>
                {isAuthenticated && token ? "Go back to Home Page" : "Go back to Main Page"}
            </button>
        </div>
    );

}

export default NoPageFound