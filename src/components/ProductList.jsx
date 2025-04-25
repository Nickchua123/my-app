// ProductList.jsx: Hiển thị danh sách sản phẩm trên giao diện người dùng, có nút "Thêm vào giỏ hàng".
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductList({ products }) {
  const { addToCart } = useCart();

  const getImageUrl = (product) => {
    const img = product.images?.[0];
    console.log(img);

    return img
      ? `http://localhost:8080/storage/Product-${product.id}/${img}`
      : "https://via.placeholder.com/300x200?text=No+Image";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col"
        >
          <Link to={`/product/${product.id}`}>
            <img
              src={getImageUrl(product)}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name}</h2>
          </Link>
          <p className="text-orange-600 font-semibold mb-2">
            ₫{product.price?.toLocaleString()}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-auto w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      ))}
    </div>
  );
}