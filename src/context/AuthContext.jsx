import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    setAuthTokens,
    getAccessToken,
    getTokenExpiry,
    clearAuthTokens,
    simulatedRefreshToken
} from '../utils/auth';


//creating context
const AuthContext = createContext();

//creating context Provider
export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const login = async (username, password) => {

        const cleanUsername = username.trim();
        const cleanPassword = password;

        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: cleanUsername, password: cleanPassword })
            });

            const receivedData = await response.json();

            if (!response.ok || !receivedData.accessToken) {
                throw new Error(receivedData.error || receivedData.message || "Invalid username or password");
            }

            setAuthTokens({ token: receivedData.accessToken, refreshToken: receivedData.refreshToken || "fake_refresh_token_incase_the_api_doesnt_provide_one" });

            setToken(receivedData.accessToken);
            setIsAuthenticated(true);
            setError(null);
            return true;

        } catch (error) {
            console.error("login error : ", error);
            setError(error.message || "Login failed. Please try again.");
            setIsAuthenticated(false);
            return false;

        }

    };


    const logout = () => {
        clearAuthTokens();
        setIsAuthenticated(false);
        setToken(null);
        setError(null);
    }

    //modifying refreshToken to be async and make the refresh logic await it properly
    const refreshToken = useCallback(async () => {
        try {
            const newToken = await simulatedRefreshToken();
            if (newToken) {
                setToken(newToken);
                setIsAuthenticated(true);
                setError(null);
                return true;
            }
            else {
                logout();
                return false;
            }
        } catch (error) {
            console.error("Refresh token failure :" + error)
            logout();
            return false;
        }

    }, []);


    //Init auth check On mount: load token from localStorage and update states

    useEffect(() => {
        const initializeAuth = async () => {
            const existingToken = getAccessToken();
            const expiry = getTokenExpiry();

            if (existingToken && expiry && Date.now() < expiry) {
                setToken(existingToken);
                setIsAuthenticated(true);
            }
            else if (existingToken && expiry && Date.now() >= expiry) {
                console.log("checking token availability in storage and refreshing");
                await refreshToken();
            }
            else {
                logout();
            }

            setLoading(false);
        }
        initializeAuth();

    }, [refreshToken]);

    // Periodic refresh 1 minute before expiry

    useEffect(() => {
        if (!token) return;

        const interval = setInterval(() => {
            const expiry = getTokenExpiry();
            const now = Date.now();
            if (expiry && expiry - now < 60000) {
                console.log("Token expiring soon, refreshing...");
                refreshToken();
            }
        }, 30000); // check every 30s

        return () => {
            console.log("clearing interval");
            clearInterval(interval);
        }
    }, [token, refreshToken]);



    const authValues = {
        isAuthenticated,
        token,
        loading,
        error,
        setError,
        login,
        logout
    };

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>


}
// creating custom hook useAuth
export const useAuth = () => useContext(AuthContext);