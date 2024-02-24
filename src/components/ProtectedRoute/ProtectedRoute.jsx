import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "@/context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(authContext);
  if (!user) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};
