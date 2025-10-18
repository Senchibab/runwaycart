import AppRoutes from '../../routes/AppRoutes';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function AuthGuard() {

    //changes to make the routes not render before the auth state is loaded and redirect to home page if the authentication is true

    const { loading, isAuthenticated } = useAuth();
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loading) {
            if (isAuthenticated && (location.pathname === "/")) {
                nav("/home", { replace: true });
            }
        }

    }, [loading, isAuthenticated, nav, location.pathname])

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading authentication...</p>
    }

    return <AppRoutes />


}
export default AuthGuard