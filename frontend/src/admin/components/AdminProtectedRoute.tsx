import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<Props> = ({ children }) => {
  const adminEmail = localStorage.getItem("admin_email");

  if (!adminEmail) {
    // ❌ Not logged in → redirect to login
    return <Navigate to="/admin/adminlogin" replace />;
  }

  // ✅ Logged in → allow access
  return <>{children}</>;
};

export default AdminProtectedRoute;