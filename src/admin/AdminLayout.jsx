// src/admin/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Import icon từ lucide-react
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Star,
  Users,
  UserCog,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentAdmin = localStorage.getItem("currentAdmin");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 p-2 bg-blue-500 text-white rounded"
      : "flex items-center gap-2 p-2 hover:bg-blue-100 rounded";

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
          <UserCog className="w-6 h-6 text- to-blue-600" />
          Admin
        </h2>

        {currentAdmin && (
          <p className="text-sm text-gray-500">
            👋 Xin chào, <strong>{currentAdmin}</strong>
          </p>
        )}

        <nav className="space-y-2 mt-4">
          <NavLink to="/admin" end className={navLinkClass}>
            <LayoutDashboard className="w-5 h-5" />
            Bảng thống kê
          </NavLink>

          <NavLink to="/admin/products" className={navLinkClass}>
            <Package className="w-5 h-5" />
            Quản lý sản phẩm
          </NavLink>

          <NavLink to="/admin/categories" className={navLinkClass}>
            <FolderTree className="w-5 h-5" />
            Quản lý danh mục
          </NavLink>

          <NavLink to="/admin/orders" className={navLinkClass}>
            <ShoppingCart className="w-5 h-5" />
            Đơn hàng
          </NavLink>

          <NavLink to="/admin/reviews" className={navLinkClass}>
            <Star className="w-5 h-5" />
            Đánh giá
          </NavLink>

          <NavLink to="/admin/admins" className={navLinkClass}>
            <Users className="w-5 h-5" />
            Quản lý tài khoản
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 bg-red-500 text-white rounded w-full justify-center mt-6 hover:bg-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
