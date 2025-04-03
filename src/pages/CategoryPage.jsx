import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import ProductFilters from "../components/ProductFilters";
import SortDropdown from "../components/SortDropdown";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";
import allProducts from "../components/data/products";
import categoryMap from "../components/data/categories";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CategoryPage() {
  const { slug } = useParams();
  const query = useQuery();
  const initialSearch = query.get("search") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const itemsPerPage = 8;

  let filteredProducts = allProducts
    .filter((p) => slug === "all" || p.category === slug)
    .filter((p) =>
      searchTerm.trim() === "" ? true : p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((p) => p.price >= (minPrice || 0) && p.price <= (maxPrice || Infinity));

  if (sortOption === "price_asc") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price_desc") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "latest") {
    filteredProducts = filteredProducts.sort((a, b) => b.id - a.id);
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Danh mục: {categoryMap[slug] || slug}
      </h1>

      <ProductFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />

      {filteredProducts.length > 0 ? (
        <>
          <ProductList products={currentItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <p>Không có sản phẩm nào phù hợp.</p>
      )}
    </div>
  );
}