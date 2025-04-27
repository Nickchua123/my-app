import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartMenu() {
  const { cartItems } = useCart();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="absolute right-0 top-8 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50 text-center text-gray-500">
        Giỏ hàng trống.
      </div>
    );
  }

  return (
    <div className="absolute right-0 top-8 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
      <h3 className="font-semibold text-lg mb-2">Sản phẩm trong giỏ</h3>
      <ul className="max-h-56 overflow-y-auto">
        {cartItems.map(item => (
          <li key={item.id} className="flex gap-2 items-center mb-2 border-b last:border-b-0 pb-2">
            <img
              src={
                item.image ||                // Nếu có trường image (chuẩn nhất)
                (item.images?.[0]           // Nếu có mảng images
                  ? `http://localhost:8080/storage/Product-${item.id}/${item.images[0]}`
                  : "/no-image.png")
              }
              alt={item.name}
              className="w-12 h-12 object-cover rounded border"
            />
            <div className="flex-1 text-sm">
              <div className="font-medium">{item.name}</div>
              <div>Số lượng: {item.quantity}</div>
            </div>
            <div className="font-bold text-orange-600 whitespace-nowrap">
              ₫{(item.price * item.quantity).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">Tổng:</span>
        <span className="font-bold text-green-600 text-lg">
          ₫{totalAmount.toLocaleString()}
        </span>
      </div>
      <Link
        to="/cart"
        className="block mt-4 py-2 bg-orange-500 text-white text-center rounded hover:bg-orange-600 transition font-semibold"
      >
        Xem giỏ hàng
      </Link>
    </div>
  );
}
