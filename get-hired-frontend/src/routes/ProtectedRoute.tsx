import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactElement;
  allowedRoles: ("CANDIDATE" | "RECRUITER" | "ADMIN")[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
