import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import AvatarDropdown from "../components/AvatarDropdown";

export default function Header() {
  const { cartItems } = useCart();
  const { currentUser } = useUser();
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Ẩn header ở trang login/register
  if (["/login", "/register"].includes(location.pathname)) {
    return (
      <header className="bg-white shadow p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-orange-500">
            ← Về trang chủ
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          COMPU
        </Link>

        {/* Tìm kiếm */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-orange-500"
          />
        </div>

        {/* Nav + User */}
        <div className="flex items-center gap-6">
          <nav className="hidden sm:flex gap-4">
            <Link to="/category/laptop" className="hover:text-orange-500 font-medium">
              Laptop
            </Link>
            <Link to="/category/pc" className="hover:text-orange-500 font-medium">
              PC
            </Link>
            <Link to="/category/accessories" className="hover:text-orange-500 font-medium">
              Phụ kiện
            </Link>
          </nav>

          {/* Avatar hoặc đăng nhập */}
          {currentUser ? (
            <AvatarDropdown />
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-orange-500">
                Đăng nhập
              </Link>
              <Link to="/register" className="text-sm font-medium hover:text-orange-500">
                Đăng ký
              </Link>
            </>
          )}

          {/* Cart icon */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
