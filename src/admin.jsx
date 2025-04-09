import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManager from "./admin/ProductManager";
import CategoryManager from "./admin/CategoryManager";
import AdminLogin from "./admin/AdminLogin";
import AdminRoute from "./admin/AdminRoute";
import AdminManager from "./admin/AdminManager";
import OrderManager from "./admin/OrderManager";
import CustomerManager from "./admin/CustomerManager";
import ReviewManager from "./admin/ReviewManager";
import UserManager from "./admin/UserManager";
import Unauthorized from "./admin/Unauthorized";

function Admin() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />

            <Route
              path="products"
              element={
                <AdminRoute requiredRole={["admin", "manager", "viewer"]}>
                  <ProductManager />
                </AdminRoute>
              }
            />

            <Route
              path="categories"
              element={
                <AdminRoute requiredRole={["admin", "manager"]}>
                  <CategoryManager />
                </AdminRoute>
              }
            />

            <Route
              path="admins"
              element={<AdminRoute requiredRole="admin"><AdminManager /></AdminRoute>}
            />

            <Route
              path="orders"
              element={
                <AdminRoute requiredRole={["admin", "manager", "viewer"]}>
                  <OrderManager />
                </AdminRoute>
              }
            />

            <Route
              path="customers"
              element={
                <AdminRoute requiredRole={["admin", "manager", "viewer"]}>
                  <CustomerManager />
                </AdminRoute>
              }
            />

            <Route
              path="reviews"
              element={<AdminRoute requiredRole="admin"><ReviewManager /></AdminRoute>}
            />

            <Route
              path="users"
              element={
                <AdminRoute requiredRole={["admin", "manager"]}>
                  <UserManager />
                </AdminRoute>
              }
            />

            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Admin;
