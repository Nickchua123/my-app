import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser,FaBars } from "react-icons/fa";
import Logo from "../assets/Icon.png";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginEmailModalOpen, setIsLoginEmailModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  

  return (
    <header className="w-full bg-white shadow-md p-4 fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 ml-4 scale-200" />
        </div>

        <div className="flex items-center">
        <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-lg flex items-center gap-2">
            <FaBars /> Danh mục
          </button>
          <div className="border border-gray-300 rounded-full w-80 px-4 flex items-center shadow-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-2 outline-none bg-transparent placeholder:text-gray-400"
            />
          </div>
          <button className="bg-blue-500 rounded-full p-3 ml-2 text-white">
            <FaSearch />
          </button>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="relative">
            <button 
              className="text-gray-700 hover:text-blue-500 flex items-center gap-2"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <FaUser /> Đăng nhập
            </button>
          </div>
          <div className="h-6 border-l border-gray-300"></div>
          <div 
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <FaShoppingCart className="text-gray-700 text-xl cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">1</span>
            
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-lg p-4 z-50">
                <h3 className="text-gray-500 text-sm">Sản Phẩm Mới Thêm</h3>
                <div className="flex items-center mt-2">
                  <img src="https://via.placeholder.com/50" alt="Tai nghe" className="w-12 h-12 object-cover" />
                  <div className="ml-3 text-sm">
                    <p className="text-gray-700">Tai nghe không dây Mini i12TWS</p>
                    <p className="text-red-500 font-semibold">₫52.800</p>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white mt-3 py-2 rounded-lg">Xem Giỏ Hàng</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="mt-4 flex justify-center gap-6 text-gray-700 border-t border-gray-300 pt-3">
        <a href="#" className="hover:text-blue-500">Trang chủ</a>
        <a href="#" className="hover:text-blue-500">Danh mục</a>
        <a href="#" className="hover:text-blue-500">Dịch vụ sửa chữa</a>
        <a href="#" className="hover:text-blue-500">Cho thuê laptop</a>
        <a href="#" className="hover:text-blue-500">Khuyến mãi</a>
        <a href="#" className="hover:text-blue-500">Thu cũ đổi mới</a>
        <a href="#" className="hover:text-blue-500">Giúp đỡ</a>
      </nav>

      {isLoginModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setIsLoginModalOpen(false)}>✖</button>
            <h2 className="text-xl font-semibold">Đăng Nhập</h2>
            <input type="text" placeholder="Email" className="w-full border mt-3 p-2 rounded-lg" />
            <input type="password" placeholder="Mật khẩu" className="w-full border mt-3 p-2 rounded-lg" />
            <p className="mt-2 text-right"> <span className="text-gray-400 cursor-pointer" onClick={() => {setIsLoginEmailModalOpen(false); setIsLoginEmailModalOpen(true);}}>Quên mật khẩu Email?</span></p>
            <button className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg">ĐĂNG NHẬP</button>
            <p className="mt-3 text-center">Bạn chưa có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => {setIsLoginModalOpen(false); setIsRegisterModalOpen(true);}}>Đăng ký ngay!</span></p>
          </div>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setIsRegisterModalOpen(false)}>✖</button>
            <h2 className="text-xl font-semibold">Đăng Ký</h2>
            <input type="text" placeholder="Email" className="w-full border mt-3 p-2 rounded-lg" />
            <input type="text" placeholder="Họ" className="w-full border mt-3 p-2 rounded-lg" />
            <input type="text" placeholder="Tên" className="w-full border mt-3 p-2 rounded-lg" />
            <input type="password" placeholder="Mật khẩu" className="w-full border mt-3 p-2 rounded-lg" />
            <button className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg">TẠO TÀI KHOẢN</button>
            <p className="mt-2 text-center">Bạn đã có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => {setIsRegisterModalOpen(false); setIsLoginModalOpen(true);}}>Đăng nhập!</span></p>
          </div>
        </div>
      )}
      {isLoginEmailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={() => setIsLoginEmailModalOpen(false)}>✖</button>
            <h2 className="text-xl font-semibold">Quên mật khẩu khẩu</h2>
            <input type="text" placeholder="Email" className="w-full border mt-3 p-2 rounded-lg" />
            <button className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg">KHÔI PHỤC</button>
            <p className="mt-3 text-center">Bạn chưa có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => {setIsLoginEmailModalOpen(false); setIsRegisterModalOpen(true);}}>Đăng ký ngay!</span></p>
          </div>
        </div>
      )}
      
    </header>
  );
}