import React, { useState } from "react";

export default function ProductList() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="product-list">
      <div className="product-item">
        <div className="product-info">
          <img src="/img/surface_go.jpg" alt="Surface" />
          <div>
            <p className="product-name">
              Microsoft Surface Go 3 Platinum 6500Y - Intel Pentium Gold 6500Y | 8GB | 10.5 Inch 1920 x 1200
            </p>
          </div>
        </div>

        <div className="quantity">
          <button onClick={handleDecrease}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
          <span className="unit-price">$120.00</span>
        </div>

        <p className="price">${(120 * quantity).toFixed(2)}</p>
      </div>

      <div className="product-item">1x Bàn Phím Máy Tính <span>$20.00</span></div>
      <div className="product-item">1x Chuột Máy Tính <span>$15.00</span></div>
    </div>
  );
}
