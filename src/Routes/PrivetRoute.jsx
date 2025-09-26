import React from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth?.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    console.log("token from private route", token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        if (decoded.role === "Admin") {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Invalid token", error);
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(false);
    }
    setIsLoading(false);
  }, [token]);

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
