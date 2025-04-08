import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManager from "./admin/ProductManager";
import CategoryManager from "./admin/CategoryManager";
import AdminLogin from "./admin/AdminLogin";
import AdminRoute from "./admin/AdminRoute";
import AdminManager from "./admin/AdminManager"; // ✅ THÊM VÀO

function Admin() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Giao diện đăng nhập admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminLogin />} />

          {/* Giao diện quản trị (yêu cầu đăng nhập) */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="categories" element={<CategoryManager />} />
            <Route path="admins" element={<AdminManager />} /> {/* ✅ Thêm đường dẫn quản lý admin */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Admin;
