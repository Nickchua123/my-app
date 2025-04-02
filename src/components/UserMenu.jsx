import { User } from "lucide-react";

export default function UserMenu({ user, setShowLoginModal, setShowRegisterModal, handleLogout }) {
  return user.isLoggedIn ? (
    <div className="hidden md:block relative group">
      <button className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
        <User size={20} />
        <span>Xin chào, {user.name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md hidden group-hover:block">
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Tài khoản</a>
        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Cài đặt</a>
        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng xuất</button>
      </div>
    </div>
  ) : (
    <div className="hidden md:block relative group">
      <button className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
        <User size={20} />
        <span>Login</span>
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 shadow-lg rounded-md hidden group-hover:block">
        <button onClick={() => setShowLoginModal(true)} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng nhập</button>
        <button onClick={() => setShowRegisterModal(true)} className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-200">Đăng ký</button>
      </div>
    </div>
  );
}
