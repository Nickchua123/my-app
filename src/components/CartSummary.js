import React, { useState } from "react";
import "../styles/CartSummary.scss";

export default function CartSummary({ onCheckout }) {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelect = (method) => {
    setSelectedPayment(prev => (prev === method ? null : method));
  };

  const getPaymentLabel = () => {
    switch (selectedPayment) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "paypal":
        return "PayPal";
      default:
        return "";
    }
  };

  return (
    <div className="cart-summary">
      <div className="summary-wrap">
        <div className="summary-line"><p>Thanh Toán</p><p>$275.00</p></div>
        <div className="summary-line"><p>Giảm Giá</p><p>$0.00</p></div>
        <div className="summary-line"><p>Phí Vận Chuyển</p><p>$50.00</p></div>
      </div>

      <div className="discount-section">
        <input type="text" placeholder="Mã Giảm Giá" />
        <button className="apply-btn">Áp Dụng</button>
      </div>

      <p className="free-shipping">Miễn phí vận chuyển cho đơn hàng trên $100.00</p>

      <button
        className="checkout-btn"
        disabled={!selectedPayment}
        onClick={() => onCheckout()}
      >
        {selectedPayment
          ? `Thanh Toán bằng ${getPaymentLabel()} | $325.00`
          : "Chọn phương thức thanh toán"}
      </button>

      <div className="payment-methods">
        {/* <p>Chọn phương thức thanh toán</p> */}
        <div className="icons">
          <div
            className={`icon-item ${selectedPayment === "visa" ? "selected" : ""}`}
            onClick={() => handleSelect("visa")}
          >
            <img src="/img/V-05214186.png" alt="Visa" />
          </div>
          <div
            className={`icon-item ${selectedPayment === "mastercard" ? "selected" : ""}`}
            onClick={() => handleSelect("mastercard")}
          >
            <img src="/img/OIP.jpg" alt="Mastercard" />
          </div>
          <div
            className={`icon-item ${selectedPayment === "paypal" ? "selected" : ""}`}
            onClick={() => handleSelect("paypal")}
          >
            <img src="/img/OIP (1).jpg" alt="PayPal" />
          </div>
        </div>
      </div>
    </div>
  );
}
