// AdminRoute.jsx – hỗ trợ nhiều vai trò (array hoặc string)
import { Navigate, useLocation } from "react-router-dom";

export default function AdminRoute({ children, requiredRole = null }) {
  const isLoggedIn = localStorage.getItem("isAdmin") === "true";
  const currentRole = JSON.parse(localStorage.getItem("admins"))?.find(
    (a) => a.email === localStorage.getItem("currentAdmin")
  )?.role;

  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(currentRole)) {
        return <Navigate to="/admin/unauthorized" replace />;
      }
    } else if (currentRole !== requiredRole) {
      return <Navigate to="/admin/unauthorized" replace />;
    }
  }

  return children;
}