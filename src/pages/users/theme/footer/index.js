import { memo } from "react";
import "./style.scss";

import Facebook from "../../../../assets/facebook.png";
import Youtube from "../../../../assets/youtube.png";
import Tiktok from "../../../../assets/tiktok.png";
import Momo from "../../../../assets/MoMo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h3>VỀ COMPU</h3>
          <ul>
            <li>Giới thiệu</li>
            <li>Tuyển dụng</li>
            <li>Liên hệ</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>CHÍNH SÁCH</h3>
          <ul>
            <li>Chính sách bảo hành</li>
            <li>Chính sách giao hàng</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>THÔNG TIN</h3>
          <ul>
            <li>Hệ thống cửa hàng</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn thanh toán</li>
            <li>Hướng dẫn trả góp</li>
            <li>Tra cứu địa chỉ bảo hành</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>TỔNG ĐÀI HỖ TRỢ</h3>
          <ul>
            <li>
              Mua hàng: <a href="tel:19005301">1900.5301</a>
            </li>
            <li>
              Bảo hành: <a href="tel:19005325">1900.5325</a>
            </li>
            <li>
              Khiếu nại: <a href="tel:18006173">1800.6173</a>
            </li>
            <li>
              Email: <a href="mailto:cskh@gearvn.com">cskh@gearvn.com</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="social-icons">
            <img src={Facebook} alt="" className="social-icons__main" />
            <img src={Youtube} alt="" className="social-icons__main" />
            <img src={Tiktok} alt="" className="social-icons__main" />
          </div>
          <h4>CÁCH THỨC THANH TOÁN</h4>
          <img src={Momo} alt="" className="social-icons__main" />
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
