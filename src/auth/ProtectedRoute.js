import React from 'react';
import { Navigate } from 'react-router-dom';

// This component takes another component as its child ('children').
function ProtectedRoute({ children }) {
    // Check for the token in localStorage
    const token = localStorage.getItem('adminToken');

    // If there is no token, redirect to the login page
    if (!token) {
        // The <Navigate> component is the modern way to programmatically redirect in React Router.
        // The 'replace' prop is used to prevent the user from clicking the browser's "back" button
        // and getting back to the protected page after being redirected.
        return <Navigate to="/admin/login" replace />;
    }

    // If a token exists, render the child component that was passed in.
    // In our case, this will be the <AdminView />.
    return children;
}

export default ProtectedRoute;