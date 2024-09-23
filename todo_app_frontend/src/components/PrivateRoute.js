import React from 'react';
import { Navigate } from 'react-router-dom';

// A wrapper component for protecting private routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to='/login' />;
};

export default PrivateRoute;