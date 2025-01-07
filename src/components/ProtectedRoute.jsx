import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;


// import { Navigate } from "react-router-dom";

// // Protect a route by checking if the user is logged in
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   return token ? children : <Navigate to="/auth" />;
// };

// export default ProtectedRoute;
