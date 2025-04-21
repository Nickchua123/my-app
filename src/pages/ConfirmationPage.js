import React from "react";
import Stepper from '../components/Stepper';
import { useNavigate } from "react-router-dom";
import "../styles/ConfirmationPage.scss";
import ConfirmProduct from "../components/ConfirmProduct";
import ConfirmDeli from "../components/ConfirmDeli"; // <-- Điều chỉnh đường dẫn nếu khác

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="confirm-page">
            <Stepper />
      <div className="container">
        <h1 className="title">Đơn Hàng Của Bạn</h1>
        <div className="main-content">
          <div className="top">
            <ConfirmProduct />
          </div>
          <div className="bottom">
            Tổng Thanh Toán
            <ConfirmDeli />
          </div>
          <button
          className="back-to-shop-btn"
          onClick={() => navigate('/')} >
            Quay lại mua sắm
            </button>
        </div>
      </div>
    </div>
  );
}