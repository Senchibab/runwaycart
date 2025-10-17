import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function PrivateRoute({ children }) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Loading...</p>
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;

}
export default PrivateRoute