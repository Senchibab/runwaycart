import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/ui/Loader';


function PrivateRoute({ children }) {

    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loader text="Authenticating user..." />
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;

}
export default PrivateRoute