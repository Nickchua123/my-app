import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  const { addToCart } = useCart();
  const [hoveredId, setHoveredId] = useState(null);

  const getImageUrl = (product) => {
    const img = product.images?.[0];
    return img
      ? `http://localhost:8080/storage/Product-${product.id}/${img}`
      : "https://via.placeholder.com/300x200?text=No+Image";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => addToCart(product)}
        />
      ))}
    </div>
  );
}
