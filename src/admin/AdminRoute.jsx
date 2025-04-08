// src/admin/AdminRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
}
