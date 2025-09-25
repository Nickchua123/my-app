import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import AvatarDropdown from "../components/AvatarDropdown";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";
import { Facebook, Instagram } from "lucide-react";
import CartMenu from "../components/CartMenu";
import logo from "../assets/Icon.png";

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
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-bold text-orange-500">Shop</span>
            </Link>
          </div>
          <Link to="/" className="text-base font-semibold text-gray-700 hover:text-orange-500 transition">
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
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-black text-white text-sm py-3 px-6 flex flex-col md:flex-row md:justify-between md:items-center text-center md:text-left font-semibold shadow">
        <div className="w-full md:w-auto mb-1 md:mb-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <span>Mon-Thu: 8:00 AM – 5:30 PM</span>
          <span className="hidden md:inline">|</span>
          <span>Showroom: <span className="font-semibold">234 Hoàng Quốc Việt, Cổ Nhuế</span></span>
          <span className="hidden md:inline">|</span>
          <span>Liên hệ với chúng tôi </span>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-4 w-full md:w-auto">
          <span className="px-3 py-1 rounded bg-gray-900 text-orange-400 font-bold mr-2">Call Us: <span className="font-semibold text-white">+84395766433</span></span>
          <a href="https://www.facebook.com/Phach2" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-orange-500 transition mr-2" title="Facebook">
            <Facebook size={22} className="text-white" />
          </a>
          <a href="#" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 hover:bg-pink-500 transition" title="Instagram">
            <Instagram size={22} className="text-white" />
          </a>
        </div>
      </div>
      {/* Main nav bar */}
      <div className="bg-white shadow px-6 py-4 flex flex-col md:flex-row md:items-center">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Left: Logo */}
          <div className="flex items-center  justify-center md:justify-start mb-2 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
            </Link>
          </div>
          {/* Center: Menu + Deals */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-6">
            <nav className="flex flex-wrap gap-10 font-semibold justify-center text-lg">
              <Link to="/category/laptop" className="hover:text-black transition">Laptops</Link>
              <Link to="/category/pc" className="hover:text-black transition">Desktop PCs</Link>
              <Link to="/category/network" className="hover:text-black transition">Networking Devices</Link>
              <Link to="/category/printer" className="hover:text-black transition">Printers & Scanners</Link>
              <Link to="/category/parts" className="hover:text-black transition">PC Parts</Link>
              <Link to="/category/other" className="hover:text-black transition">All Other Products</Link>
              <Link to="/category/repairs" className="hover:text-black transition">Repairs</Link>
            </nav>
            <Link to="/deals" className="border border-black text-black px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition text-lg">Our Deals</Link>
          </div>
          {/* Right: Search, Cart, User */}
          <div className="flex items-center gap-6  justify-center md:justify-end mt-2 md:mt-0">
            {/* Search */}
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-400 rounded px-4 py-2 w-32 md:w-40 focus:outline-black text-center text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-3 text-black hover:text-gray-700 transition">
                <FiSearch size={22} />
              </button>
            </form>
            {/* Cart icon */}
            <div className="relative">
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
                  <CartMenu />
                </div>
              )}
            </div>
            {/* Avatar hoặc đăng nhập */}
            {currentUser ? (
              <AvatarDropdown />
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className="text-base font-semibold hover:text-black transition">Đăng nhập</Link>
                <Link to="/register" className="text-base font-semibold hover:text-black transition">Đăng ký</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
