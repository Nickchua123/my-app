import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import AvatarDropdown from "../components/AvatarDropdown";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { Facebook, Instagram } from "lucide-react";
import CartMenu from "../components/CartMenu";
import logo from "../assets/Icon.png";

export default function Header() {
  const { cartItems } = useCart();
  const { currentUser } = useUser();
  const location = useLocation();
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartRef = useRef(null);

  const totalItems = cartItems.length;

  // ✅ Click ra ngoài CartMenu thì tự đóng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCartMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔎 Tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      console.log("Tìm kiếm:", searchQuery);
    }
  };

  // 🧭 Ẩn header khi ở login/register
  if (["/login", "/register"].includes(location.pathname)) {
    return (
      <header className="bg-white shadow p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-orange-500">Shop</span>
          </Link>
          <Link
            to="/"
            className="text-base font-semibold text-gray-700 hover:text-orange-500 transition"
          >
            ← Về trang chủ
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50">
      {/* --- Thanh thông tin trên cùng --- */}
      <div className="bg-black text-white text-sm py-3 px-6 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left font-semibold shadow">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <span>Thứ 2-Thứ 5: 8:00 – 17:30</span>
          <span className="hidden md:inline">|</span>
          <span>
            Showroom:{" "}
            <span className="font-semibold">234 Hoàng Quốc Việt, Cổ Nhuế</span>
          </span>
          <span className="hidden md:inline">|</span>
          <span>Liên hệ với chúng tôi</span>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-4">
          <span className="px-2 py-1 rounded bg-gray-900 text-orange-400 font-bold">
            Gọi cho chúng tôi:{" "}
            <span className="font-semibold text-white">+84395766433</span>
          </span>
          <a
            href="https://www.facebook.com/Phach2"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-500 transition"
            title="Facebook"
          >
            <Facebook size={22} className="text-white" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-red-500 transition"
            title="Instagram"
          >
            <Instagram size={22} className="text-white" />
          </a>
        </div>
      </div>

      {/* --- Thanh điều hướng chính --- */}
      <div className="bg-white shadow px-2 py-3 flex flex-col md:flex-row md:items-center border-b border-gray-200 container mx-auto">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-15 w-15 object-contain" />
          </Link>

          {/* Menu */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6 text-sm">
            <nav className="flex flex-wrap gap-6 font-semibold justify-center">
              <Link to="/category/laptop" className="hover:text-black transition">
                Laptop
              </Link>
              <Link to="/category/pc" className="hover:text-black transition">
                Máy tính để bàn
              </Link>
              <Link to="/category/network" className="hover:text-black transition">
                Thiết bị mạng
              </Link>
              <Link to="/category/printer" className="hover:text-black transition">
                Máy in & Scan
              </Link>
              <Link to="/category/parts" className="hover:text-black transition">
                Linh kiện PC
              </Link>
              <Link to="/category/other" className="hover:text-black transition">
                Các sản phẩm khác
              </Link>
              <Link to="/category/repairs" className="hover:text-black transition">
                Sửa chữa
              </Link>
            </nav>
            <Link
              to="/deals"
              className="border border-black text-black px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm"
            >
              Khuyến mãi
            </Link>
          </div>

          {/* --- Tìm kiếm, giỏ hàng, user --- */}
          <div className="flex items-center gap-6 justify-center md:justify-end mt-2 md:mt-0">
            {/* Tìm kiếm */}
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="border border-gray-400 rounded-2xl px-4 py-2 w-40 md:w-64 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700"
              >
                <FiSearch size={22} />
              </button>
            </form>

            {/* Giỏ hàng */}
            <div className="relative" ref={cartRef}>
              <div
                className="relative cursor-pointer flex items-center"
                onClick={() => setShowCartMenu((open) => !open)}
              >
                <FiShoppingCart size={26} className="text-black" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-black text-white text-sm w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow font-bold animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>

              {showCartMenu && (
                <div className="absolute right-0 top-full mt-2 z-50">
                  <CartMenu onClose={() => setShowCartMenu(false)} />
                </div>
              )}
            </div>

            {/* Avatar / Đăng nhập */}
            {currentUser ? (
              <AvatarDropdown />
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="text-base font-semibold hover:text-black transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="text-base font-semibold hover:text-black transition"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
