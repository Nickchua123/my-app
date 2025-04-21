import React, { useState } from "react";

export default function ConfirmProduct() {
  const [quantity, setQuantity] = useState(2); // Surface Go 3 số lượng 2

  // Danh sách sản phẩm
  const items = [
    {
      name: "Microsoft Surface Go 3 Platinum 6500Y - Intel Pentium Gold 6500Y | 8GB | 10.5 Inch 1920 x 1200",
      price: 120,
      quantity: quantity,
      img: "/img/surface_go.jpg",
      adjustable: false, // Có thể chỉnh số lượng
    },
    {
      name: "Bàn Phím Máy Tính",
      price: 20,
      quantity: 1,
      adjustable: false,
    },
    {
      name: "Chuột Máy Tính",
      price: 15,
      quantity: 1,
      adjustable: false,
    },
  ];

  return (
    <div className="product-list">
      {items.map((item, index) => (
        <div className="product-item" key={index}>
          <div className="product-info">
            {item.img && <img src={item.img} alt={item.name} />}
            <p className="product-name">{item.name}</p>
          </div>

          <div className="quantity">
            {item.adjustable ? (
              <>
                <span>{item.quantity}</span>
              </>
            ) : (
              <span>{item.quantity}x</span>
            )}
            <span className="unit-price">${item.price.toFixed(2)}</span>
          </div>

          <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
