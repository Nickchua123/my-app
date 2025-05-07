import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import AvatarDropdown from "../components/AvatarDropdown";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { FaListUl } from "react-icons/fa"; // ICON DANH MỤC
import CartMenu from "../components/CartMenu";

export default function Header() {
  const { cartItems } = useCart();
  const { currentUser } = useUser();
  const location = useLocation();
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = cartItems.length;

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500 tracking-wide">
          COMPU
        </Link>
        {/* Danh mục với icon */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            className="flex items-center gap-2 text-white bg-gradient-to-r from-orange-400 to-orange-600 px-3 py-1.5 rounded shadow hover:brightness-105 transition"
          >
            <FaListUl size={20} />
            Danh mục
          </button>

          {showCategoryMenu && (
            <div className="absolute top-12 left-0 bg-white shadow-xl rounded-lg p-3 w-48 z-100 border">
              <ul>
                <li>
                  <Link to="/category/laptop" className="block p-2 hover:bg-orange-100 rounded">
                    Laptop
                  </Link>
                </li>
                <li>
                  <Link to="/category/pc" className="block p-2 hover:bg-orange-100 rounded">
                    PC
                  </Link>
                </li>
                <li>
                  <Link to="/category/accessories" className="block p-2 hover:bg-orange-100 rounded">
                    Phụ kiện
                  </Link>
                </li>
                <li>
                  <Link to="/category/others" className="block p-2 hover:bg-orange-100 rounded">
                    Khác
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Tìm kiếm */}
        <form className="flex-1" onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-2 top-2 text-gray-500">
              <FiSearch size={20} />
            </button>
          </div>
        </form>

        {/* Nav + User */}
        <div className="flex items-center gap-6">
          {/* <nav className="hidden sm:flex gap-4 items-center font-medium">
            <Link to="/category/laptop" className="hover:text-orange-500">
              Laptop
            </Link>
            <Link to="/category/pc" className="hover:text-orange-500">
              PC
            </Link>
            <Link to="/category/accessories" className="hover:text-orange-500">
              Phụ kiện
            </Link>
            <Link to="/promotions" className="hover:text-orange-500">
              Khuyến mãi
            </Link>


          </nav> */}

          {/* Avatar hoặc đăng nhập */}
          {currentUser ? (
            <AvatarDropdown />
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-sm font-medium hover:text-orange-500">
                Đăng nhập
              </Link>
              <Link to="/register" className="text-sm font-medium hover:text-orange-500">
                Đăng ký
              </Link>
            </div>
          )}

          {/* Cart icon */}
          <div className="relative">
            <div
              className="relative cursor-pointer flex items-center"
              onClick={() => setShowCartMenu((open) => !open)}
            >
              <FiShoppingCart size={28} className="text-orange-600 drop-shadow" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg font-bold animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            {showCartMenu && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <CartMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
