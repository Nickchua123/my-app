import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ProductManager from "./admin/ProductManager";
import CategoryManager from "./admin/CategoryManager";
import AdminLogin from "./admin/AdminLogin";
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
          {/* <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminLogin />} /> */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />

            <Route path="products" element={<ProductManager />} />

            <Route path="categories" element={<CategoryManager />} />

            <Route path="admins" element={<AdminManager />} />

            <Route path="orders" element={<OrderManager />} />

            <Route path="customers" element={<CustomerManager />} />

            <Route path="reviews" element={<ReviewManager />} />

            <Route path="users" element={<UserManager />} />

            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Admin;
