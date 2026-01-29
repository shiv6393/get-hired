import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactElement;
  allowedRoles: ("USER" | "RECRUITER" | "ADMIN")[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { role } = useAuth();

  // Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
