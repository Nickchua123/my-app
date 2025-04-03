import { useCart } from "../context/CartContext";

export default function ProductList({ products }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between">
          <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t mb-2" />
          <div>
            <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-2">Giá: {product.price.toLocaleString()} đ</p>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="mt-auto w-full py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      ))}
    </div>
  );
}
