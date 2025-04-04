import { memo } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/Icon.png";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-36" />
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-300">
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="outline-none px-2 text-gray-700"
          />
          <button className="text-gray-500 hover:text-teal-600">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center text-gray-900 relative">
          <h4 className="mr-4 font-semibold">Tài khoản của bạn</h4>
          <div className="relative">
            <FaShoppingCart className="text-2xl cursor-pointer" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto py-3 px-6">
          <ul className="flex justify-center space-x-6 text-gray-800 font-semibold">
            <li className="cursor-pointer hover:text-teal-600">Trang Chủ</li>
            <li className="cursor-pointer hover:text-teal-600">Laptop</li>
            <li className="cursor-pointer hover:text-teal-600">
              Phụ Kiện Máy Tính
            </li>
            <li className="cursor-pointer hover:text-teal-600">
              Bảo Hành Hậu Đãi
            </li>
            <li className="cursor-pointer hover:text-teal-600">
              Cho Thuê Laptop
            </li>
            <li className="cursor-pointer hover:text-teal-600">
              Chương trình khuyến mãi/gói
            </li>
            <li className="cursor-pointer hover:text-teal-600">Giúp đỡ</li>
            <li className="cursor-pointer hover:text-teal-600">Phần thưởng</li>
            <li className="cursor-pointer hover:text-teal-600">Blog</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
