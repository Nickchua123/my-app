// SearchBar.jsx: Tìm kiếm sản phẩm, hiển thị gợi ý và truy cập nhanh danh mục
import { useState } from "react";
import { Menu, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import categoryMap from "./data/categories";

export default function SearchBar({ menuOpen, searchQuery, setSearchQuery, suggestions }) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  const categories = Object.entries(categoryMap).map(([key, label]) => ({
    label,
    path: `/category/${key}`,
  }));

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else {
        setShowSuggestions(false);
        navigate(`/category/all?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item);
    setShowSuggestions(false);
    navigate(`/category/all?search=${encodeURIComponent(item)}`);
  };

  const highlightMatch = (text) => {
    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + searchQuery.length);
    const after = text.slice(index + searchQuery.length);
    return (
      <span>
        {before}
        <span className="font-semibold text-blue-600">{match}</span>
        {after}
      </span>
    );
  };

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
                  onClick={() => setShowCategoryMenu(false)}
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
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className="w-full py-2 px-4 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
        <Search className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" size={20} />
        {showSuggestions && searchQuery && suggestions.length > 0 && (
          <ul className="absolute w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 mt-1 rounded-md shadow-lg z-50">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer ${index === activeIndex ? "bg-blue-100 dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSuggestionClick(item)}
              >
                {highlightMatch(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
