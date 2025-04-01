import { memo } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import "./style.scss";
import Logo from "../../../../assets/Icon.png";
const Header = () => {
  return (
    <header className="header">
      <div className="header__top">
        <div className="container">
          <div className="header__logo">
            <img src={Logo} alt="Logo" className="header__logo__main" />
          </div>
          <div className="header__search">
            <input type="text" placeholder="Tìm kiếm" />
            <button>
              <FaSearch />
            </button>
          </div>
          <div className="header__account">
            <h4>Tài khoản của bạn</h4>
            <FaShoppingCart className="cart-icon" />
            <span>0</span>
          </div>
        </div>
      </div>

      <nav className="header__nav">
        <div className="container">
          <ul>
            <li>Trang Chủ</li>
            <li>Laptop</li>
            <li>Phụ Kiện Máy Tính</li>
            <li>Bảo Hành Hậu Đãi</li>
            <li>Cho Thuê Laptop</li>
            <li>Chương trình khuyến mãi/gói</li>
            <li>Giúp đỡ</li>
            <li>Phần thưởng</li>
            <li>Blog</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default memo(Header);
