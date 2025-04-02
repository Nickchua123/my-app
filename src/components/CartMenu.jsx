import { ShoppingCart } from "lucide-react";

export default function CartMenu({ cartHover, setCartHover, totalQuantity, totalAmount, cartItems }) {
  return (
    <div
      className="relative"
      onMouseEnter={() => setCartHover(true)}
      onMouseLeave={() => setCartHover(false)}
    >
      <button className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition duration-300">
        <ShoppingCart size={20} className="text-gray-800 dark:text-white" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {totalQuantity}
        </span>
      </button>
      {cartHover && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-900 shadow-lg rounded-md p-4 z-50">
          <h3 className="text-lg font-semibold mb-2">Giỏ hàng ({totalQuantity} sản phẩm)</h3>
          <ul className="max-h-40 overflow-y-auto">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-2 py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                <div className="flex-grow">
                  <p className="text-gray-800 dark:text-gray-200 text-sm">{item.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">x{item.quantity}</p>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-sm">
                  ${item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-2 font-semibold text-gray-800 dark:text-gray-200">Tổng: ${totalAmount}</div>
          <div className="mt-4 flex space-x-2">
            <button className="flex-1 py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 transition duration-300">Xem giỏ hàng</button>
            <button className="flex-1 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Thanh toán</button>
          </div>
        </div>
      )}
    </div>
  );
}
