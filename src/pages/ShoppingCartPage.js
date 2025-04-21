import React from "react";
import ProductList from "../components/ProductList";
import CartSummary from "../components/CartSummary";
import DeliveryInfo from "../components/Delivery";
import Stepper from '../components/Stepper';
import { useNavigate } from "react-router-dom";
import "../styles/ShoppingCartPage.scss";

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="shopping-cart-page">
            <Stepper />
      <div className="container">
        <h1 className="title">Giỏ Hàng</h1>
        <div className="main-content">
          <div className="left-column">
            <ProductList />
            <DeliveryInfo />
          </div>
          <CartSummary onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
}
