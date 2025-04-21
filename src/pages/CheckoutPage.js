import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import Stepper from '../components/Stepper';
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../components/CheckoutSummary";
import "../styles/CheckoutPage.scss";

export default function CheckoutPage() {
  const navigate = useNavigate(); 
  return (
    <div className="checkout-page">
            <Stepper />
      <div className="container">
        <h1 className="title">Vận Chuyển</h1>
        <div className="main-content">
          <div className="left-column">
            <CheckoutForm />
          </div>
          <div className="right-column">
            <CheckoutSummary/>   
          </div>
          <button
          className="back-to-cart-btn"
          onClick={() => navigate('/')} >
            Quay lại Giỏ Hàng
            </button>
        </div>
      </div>
    </div>
  );
}
