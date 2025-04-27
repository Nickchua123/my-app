import { useLocation } from "react-router-dom";
import face from "../assets/Facebook.png";
import youtu from "../assets/youtube.png";
import tik from "../assets/tiktok.png";
import momo from "../assets/MoMo.png";

export default function Footer() {
  const location = useLocation();
  if (["/login", "/register"].includes(location.pathname)) return null;

  return (
    <footer className="bg-white text-black pt-8 pb-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          {/* CỘT 1: VỀ COMPU */}
          <div>
            <h3 className="font-semibold mb-3">VỀ COMPU</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-orange-500">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-orange-500">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-orange-500">Liên hệ</a></li>
            </ul>
          </div>
          {/* CỘT 2: CHÍNH SÁCH */}
          <div>
            <h3 className="font-semibold mb-3">CHÍNH SÁCH</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-orange-500">Bảo hành</a></li>
              <li><a href="#" className="hover:text-orange-500">Giao hàng</a></li>
              <li><a href="#" className="hover:text-orange-500">Bảo mật</a></li>
            </ul>
          </div>
          {/* CỘT 3: HOTLINE + SOCIAL */}
          <div>
            <h3 className="font-semibold mb-3">HOTLINE</h3>
            <div className="mb-2">
              <span className="font-medium text-orange-600">0398 373 833</span> (Mua hàng)<br />
              <span className="font-medium text-orange-600">0395 766 433</span> (Bảo hành)
            </div>
            <h3 className="font-semibold mb-3">KẾT NỐI</h3>
            <div className="flex items-center space-x-2">
              <a href="https://facebook.com/Phach2" target="_blank" rel="noopener noreferrer">
                <img src={face} alt="Facebook" className="w-8 h-8 rounded-full shadow hover:scale-110 transition-transform" />
              </a>
              <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer">
                <img src={youtu} alt="Youtube" className="w-8 h-8 rounded-full shadow hover:scale-110 transition-transform" />
              </a>
              <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer">
                <img src={tik} alt="Tiktok" className="w-8 h-8 rounded-full shadow hover:scale-110 transition-transform" />
              </a>
            </div>
            {/* <div className="mt-4">
              <img src={momo} alt="MoMo" className="w-12 h-12" />
            </div> */}
          </div>
          {/* CỘT 4: MAP + ĐỊA CHỈ */}
          <div>
            <h3 className="font-semibold mb-3">ĐỊA CHỈ CỬA HÀNG</h3>
            <div className="rounded-lg overflow-hidden border shadow-sm mb-2">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.239766678062!2d105.81945421541537!3d21.02882449310619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab3b3f1c8aeb%3A0x832a6e2d4c631c2d!2zTmdo4buHbiBUaOG6oWkgVGjDtG5nIFRpbmggLSBMw6ogVGjDoG5oIFRow6FuaCBQaOG7kSBOaMOgIFThu5F1!5e0!3m2!1svi!2s!4v1628078855250!5m2!1svi!2s"
                width="100%"
                height="90"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-xs text-gray-700">
              Tòa A, Đại học Điện Lực,<br />
              235 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
            </div>
            <a
              href="https://maps.app.goo.gl/jXhiwVShiTBuUNdW7"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-xs text-orange-600 font-medium hover:underline mt-1"
            >
              ➤ Chỉ đường tới cửa hàng
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          © 2025 COMPU. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
