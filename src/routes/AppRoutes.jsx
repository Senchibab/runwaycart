import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../pages/Welcome';
import HomePage from '../pages/Home';
import PrivateRoute from './PrivateRoute';
import NoPageFound from '../pages/NoPageFound';

function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>} />
            <Route path="*" element={<NoPageFound />} />
        </Routes>
    )


}

export default AppRoutes