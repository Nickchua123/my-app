import React, { useState } from "react";

const Pagination = () => {
  const products = [
    { id: 1, name: "Quần Dùi Bé Gái", price: 62000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Áo Khoác Hoodie", price: 21000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "iPhone 13 128GB", price: 12690000, category: "Điện tử", imageUrl: "https://via.placeholder.com/150" },
    { id: 4, name: "Vít Trụ Lực", price: 17128, category: "Công cụ", imageUrl: "https://via.placeholder.com/150" },
    { id: 5, name: "Ghế Làm Việc", price: 12950000, category: "Nội thất", imageUrl: "https://via.placeholder.com/150" },
    { id: 6, name: "Sản phẩm 6", price: 50000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 7, name: "Sản phẩm 7", price: 75000, category: "Điện tử", imageUrl: "https://via.placeholder.com/150" },
    { id: 8, name: "Sản phẩm 8", price: 30000, category: "Công cụ", imageUrl: "https://via.placeholder.com/150" },
    { id: 9, name: "Sản phẩm 9", price: 45000, category: "Nội thất", imageUrl: "https://via.placeholder.com/150" },
    { id: 10, name: "Sản phẩm 10", price: 60000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 11, name: "Sản phẩm 11", price: 55000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 12, name: "Sản phẩm 12", price: 80000, category: "Điện tử", imageUrl: "https://via.placeholder.com/150" },
    { id: 13, name: "Sản phẩm 13", price: 35000, category: "Công cụ", imageUrl: "https://via.placeholder.com/150" },
    { id: 14, name: "Sản phẩm 14", price: 50000, category: "Nội thất", imageUrl: "https://via.placeholder.com/150" },
    { id: 15, name: "Sản phẩm 15", price: 70000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 16, name: "Sản phẩm 16", price: 90000, category: "Điện tử", imageUrl: "https://via.placeholder.com/150" },
    { id: 17, name: "Sản phẩm 17", price: 40000, category: "Công cụ", imageUrl: "https://via.placeholder.com/150" },
    { id: 18, name: "Sản phẩm 18", price: 55000, category: "Nội thất", imageUrl: "https://via.placeholder.com/150" },
    { id: 19, name: "Sản phẩm 19", price: 65000, category: "Thời trang", imageUrl: "https://via.placeholder.com/150" },
    { id: 20, name: "Sản phẩm 20", price: 85000, category: "Điện tử", imageUrl: "https://via.placeholder.com/150" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const itemsPerPage = 12;

  // Lọc sản phẩm
  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "Tất cả" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      product.price >= (priceRange.min || 0) && product.price <= (priceRange.max || Infinity)
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="w-4/5 mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {/* Bộ lọc */}
      <div className="flex gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="Tất cả">Tất cả danh mục</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Công cụ">Công cụ</option>
          <option value="Nội thất">Nội thất</option>
        </select>
        <input
          type="number"
          placeholder="Giá tối thiểu"
          onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-1/4"
        />
        <input
          type="number"
          placeholder="Giá tối đa"
          onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-1/4"
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-t-lg mb-2" />
            <p className="font-semibold text-lg">{item.name}</p>
            <p className="text-gray-600">Giá: {item.price.toLocaleString()} đ</p>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === pageNumber ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;