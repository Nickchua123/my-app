import { memo } from "react";
import Facebook from "../assets/facebook.png";
import Youtube from "../assets/youtube.png";
import Tiktok from "..//assets/tiktok.png";
import Momo from "../assets/MoMo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* VỀ COMPU */}
        <div>
          <h3 className="text-lg font-bold mb-4">VỀ COMPU</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 cursor-pointer">Giới thiệu</li>
            <li className="hover:text-gray-400 cursor-pointer">Tuyển dụng</li>
            <li className="hover:text-gray-400 cursor-pointer">Liên hệ</li>
          </ul>
        </div>

        {/* CHÍNH SÁCH */}
        <div>
          <h3 className="text-lg font-bold mb-4">CHÍNH SÁCH</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 cursor-pointer">
              Chính sách bảo hành
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Chính sách giao hàng
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Chính sách bảo mật
            </li>
          </ul>
        </div>

        {/* THÔNG TIN */}
        <div>
          <h3 className="text-lg font-bold mb-4">THÔNG TIN</h3>
          <ul className="space-y-2">
            <li className="hover:text-gray-400 cursor-pointer">
              Hệ thống cửa hàng
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Hướng dẫn mua hàng
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Hướng dẫn thanh toán
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Hướng dẫn trả góp
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              Tra cứu địa chỉ bảo hành
            </li>
          </ul>
        </div>

        {/* TỔNG ĐÀI HỖ TRỢ */}
        <div>
          <h3 className="text-lg font-bold mb-4">TỔNG ĐÀI HỖ TRỢ</h3>
          <ul className="space-y-2">
            <li>
              Mua hàng:{" "}
              <a
                href="tel:19005301"
                className="text-yellow-400 hover:underline"
              >
                1900.5301
              </a>
            </li>
            <li>
              Bảo hành:{" "}
              <a
                href="tel:19005325"
                className="text-yellow-400 hover:underline"
              >
                1900.5325
              </a>
            </li>
            <li>
              Khiếu nại:{" "}
              <a
                href="tel:18006173"
                className="text-yellow-400 hover:underline"
              >
                1800.6173
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:cskh@gearvn.com"
                className="text-yellow-400 hover:underline"
              >
                cskh@gearvn.com
              </a>
            </li>
          </ul>
        </div>

        {/* KẾT NỐI & THANH TOÁN */}
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="flex justify-center gap-4 mb-4">
            <img
              src={Facebook}
              alt="Facebook"
              className="w-8 h-8 hover:opacity-75 cursor-pointer"
            />
            <img
              src={Youtube}
              alt="Youtube"
              className="w-8 h-8 hover:opacity-75 cursor-pointer"
            />
            <img
              src={Tiktok}
              alt="Tiktok"
              className="w-8 h-8 hover:opacity-75 cursor-pointer"
            />
          </div>

          <h4 className="text-md font-semibold mb-2">CÁCH THỨC THANH TOÁN</h4>
          <img
            src={Momo}
            alt="Momo"
            className="w-12 h-12 mx-auto hover:opacity-75 cursor-pointer"
          />
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
