// src/components/ProductFilters.jsx
export default function ProductFilters({ searchTerm, setSearchTerm, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên sản phẩm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded shadow-sm focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="number"
          placeholder="💸 Giá tối thiểu"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 p-3 rounded shadow-sm focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="number"
          placeholder="💰 Giá tối đa"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 p-3 rounded shadow-sm focus:ring-2 focus:ring-orange-500"
        />
      </div>
    );
  }
  