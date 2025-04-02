import { useState } from "react";
import { Menu, Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchBar({ menuOpen, searchQuery, setSearchQuery, suggestions }) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const categories = [
    { label: "Thời trang", path: "/category/fashion" },
    { label: "Điện tử", path: "/category/electronics" },
    { label: "Sách", path: "/category/books" },
    { label: "Đồ gia dụng", path: "/category/home" },
  ];

  return (
    <div className={`mt-4 md:mt-0 ${menuOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-4 flex-grow max-w-lg`}>
      
      {/* Nút Danh mục + Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
          className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-gray-200 text-gray-900 hover:bg-gray-300 transition duration-300"
        >
          <Menu size={20} />
          <span>Danh mục</span>
          <ChevronDown size={16} />
        </button>

        {showCategoryMenu && (
          <ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
            {categories.map((cat, index) => (
              <li key={index}>
                <Link
                  to={cat.path}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                  onClick={() => setShowCategoryMenu(false)} // ẩn dropdown khi click
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Ô tìm kiếm + gợi ý */}
      <div className="relative flex-grow">
        <input 
          type="text" 
          placeholder="Tìm kiếm sản phẩm..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <Search className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" size={20} />
        {searchQuery && suggestions.length > 0 && (
          <ul className="absolute w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 mt-1 rounded-md shadow-lg z-50">
            {suggestions.map((item, index) => (
              <li 
                key={index}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setSearchQuery(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
