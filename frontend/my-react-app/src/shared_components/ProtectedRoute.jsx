import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { authDetails } = useAppContext();
  if (!authDetails.username)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
