// src/admin/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentAdmin = localStorage.getItem("currentAdmin");

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-1">🛠️ Admin</h2>
        {currentAdmin && (
          <p className="text-sm text-gray-500">
            👋 Xin chào, <strong>{currentAdmin}</strong>
          </p>
        )}

        <nav className="space-y-2 mt-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-500 text-white rounded"
                : "block p-2 hover:bg-orange-100 rounded"
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-500 text-white rounded"
                : "block p-2 hover:bg-orange-100 rounded"
            }
          >
            📦 Quản lý sản phẩm
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-500 text-white rounded"
                : "block p-2 hover:bg-orange-100 rounded"
            }
          >
            🗂️ Quản lý danh mục
          </NavLink>

          <NavLink
            to="/admin/admins"
            className={({ isActive }) =>
              isActive
                ? "block p-2 bg-orange-500 text-white rounded"
                : "block p-2 hover:bg-orange-100 rounded"
            }
          >
            👥 Quản lý admin
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="block p-2 bg-red-500 text-white rounded w-full text-center mt-6"
        >
          🚪 Đăng xuất
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
