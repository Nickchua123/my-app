import React, { useState } from 'react';
import "../styles/CheckoutSummary.scss";
import { useNavigate } from 'react-router-dom';

export default function CheckoutSummary() {
  const navigate = useNavigate();
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState(false);
  const [coupon, setCoupon] = useState("");

  const handleConfirm = () => {
    if (!addressConfirmed) {
      alert("Vui lòng xác nhận địa chỉ giao hàng.");
      return;
    }
    navigate('/confirmation');
  };


  return (
    <div className="cart-summary">
      <div className="summary-wrap">
        <div className="summary-line">
          <p>Thanh Toán</p>
          <p>$275.00</p>
        </div>
        <div className="summary-line">
          <p>Vận Chuyển</p>
          <p>New York, US</p>
        </div>
        <div className="summary-line">
          <p>Giảm Giá</p>
          <p>$0.00</p>
        </div>
        <div className="summary-line">
          <p>Phí Vận Chuyển</p>
          <p>$50.00</p>
        </div>

        <div className="discount-section">
          <input
            type="text"
            placeholder="Mã Giảm Giá"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="apply-btn">Áp Dụng</button>
        </div>

        <div className="extra-options">
          <label>
            <input
              type="checkbox"
              checked={addressConfirmed}
              onChange={() => setAddressConfirmed(!addressConfirmed)}
            />
            Tôi xác nhận rằng địa chỉ của tôi là hoàn toàn chính xác và sẽ chịu trách nhiệm nếu sai địa chỉ. 
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={subscribeEmail}
                onChange={() => setSubscribeEmail(!subscribeEmail)}
              />
              Đăng ký nhận cập nhật và tin tức qua email (không bắt buộc)
            </label>
          </div>
        </div>
        <button className="confirm-btn" onClick={handleConfirm}>
          Đặt Hàng | $325.00
        </button>
      </div>
    </div>
  );
}
