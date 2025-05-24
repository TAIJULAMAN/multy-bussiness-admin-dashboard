import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === 'ADMIN') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loader-black"></span>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
