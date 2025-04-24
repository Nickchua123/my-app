// SortDropdown.jsx: Dropdown để sắp xếp sản phẩm theo giá tăng/giảm hoặc mới nhất.
// src/components/SortDropdown.jsx
export default function SortDropdown({ sortOption, setSortOption }) {
  return (
    <div className="flex justify-end mb-4">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border border-gray-300 p-2 rounded shadow-sm focus:ring-2 focus:ring-orange-500"
      >
        <option value="default">Sắp xếp</option>
        <option value="price_asc">Giá tăng dần</option>
        <option value="price_desc">Giá giảm dần</option>
        <option value="latest">Mới nhất</option>
      </select>
    </div>
  );
}
