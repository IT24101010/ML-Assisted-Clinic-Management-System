import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);

    if (loading) return <LoadingSpinner />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return user?.role === 'admin' ? children : <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
