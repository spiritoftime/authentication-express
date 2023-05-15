import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { id: documentId } = useParams();
  const location = useLocation();
  const { authDetails, isLoadingAuth } = useAppContext();
  if (isLoadingAuth) return null;
  if (!authDetails.username)
    return <Navigate to="/login" state={{ from: location }} replace />;
  if (location.pathname === "/home") {
    return <>{children}</>;
  }
  for (const document of authDetails.accessibleDocuments) {
    if (document.id === documentId) {
      return <>{children}</>;
    }
  }
  for (const document of authDetails.createdDocuments) {
    if (document.id === documentId) {
      return <>{children}</>;
    }
  }
  return <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default ProtectedRoute;
