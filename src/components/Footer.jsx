import { useLocation } from "react-router-dom";
import face from "../assets/Facebook.png";
import youtu from "../assets/youtube.png";
import tik from "../assets/tiktok.png";
import momo from "../assets/MoMo.png";

export default function Footer() {
  const location = useLocation();

  // Ẩn footer ở trang login và register
  if (["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="bg-white text-black py-8 border-t border-gray-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
          {/* Cột 1 */}
          <div>
            <h3 className="font-semibold mb-3">VỀ COMPU</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-500">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-blue-500">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-500">Liên hệ</a></li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="font-semibold mb-3">CHÍNH SÁCH</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-500">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-blue-500">Chính sách giao hàng</a></li>
              <li><a href="#" className="hover:text-blue-500">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="font-semibold mb-3">THÔNG TIN</h3>
            <ul>
              <li><a href="#" className="hover:text-blue-500">Hệ thống cửa hàng</a></li>
              <li><a href="#" className="hover:text-blue-500">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-blue-500">Hướng dẫn thanh toán</a></li>
              <li><a href="#" className="hover:text-blue-500">Hướng dẫn trả góp</a></li>
              <li><a href="#" className="hover:text-blue-500">Tra cứu địa chỉ bảo hành</a></li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h3 className="font-semibold mb-3">TỔNG ĐÀI HỖ TRỢ</h3>
            <ul>
              <li>Mua hàng: <a href="tel:19005301" className="text-blue-500">0398373833</a></li>
              <li>Bảo hành: <a href="tel:19005325" className="text-blue-500">0395766433</a></li>
              <li>Khiếu nại: <a href="tel:18006173" className="text-blue-500">the_phach_5</a></li>
              <li>Email: <a href="mailto:cskh@gearvn.com" className="text-blue-500">thephach5@gmail.com</a></li>
            </ul>
          </div>

          {/* Cột 5 */}
          <div>
            <h3 className="font-semibold mb-3">KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className="flex space-x-3">
              <a href="#" className="text-2xl hover:scale-110 transition-transform duration-200">
                <img src={face} alt="Facebook" className="w-10" />
              </a>
              <a href="#" className="text-2xl hover:scale-110 transition-transform duration-200">
                <img src={youtu} alt="Youtube" className="w-10" />
              </a>
              <a href="#" className="text-2xl hover:scale-110 transition-transform duration-200">
                <img src={tik} alt="Tiktok" className="w-10" />
              </a>
            </div>
            <h3 className="font-semibold mt-4 mb-3">CÁCH THỨC THANH TOÁN</h3>
            <div className="flex space-x-3">
              <img src={momo} alt="MoMo" className="w-10" />
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-500">
          © 2025 COMPU. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
