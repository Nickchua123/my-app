import React, { useState } from 'react';

function Demo() {
  const [user, setUser] = useState(false); // useState phải nằm trong function component

  const GioHang = [
    { id: 1, name: "product 1", cost: 50, price: 2 },
    { id: 2, name: "product 2", cost: 50, price: 1 },
    { id: 3, name: "product 3", cost: 50, price: 2 },
    { id: 4, name: "product 4", cost: 50, price: 5 },
  ];

  const TongTien = GioHang.reduce((total, item) => total + item.cost * item.price, 0); // thiếu giá trị khởi tạo là 0

  const onClose = () => {
    console.log("Đã nhấn nút Close");
  };

  return (
    <div>
      <p>Tổng tiền: {TongTien}</p>
      <button onClick={onClose} className='mt-4 bg-red-500 text-white py-2 px-4 rounded'>
        Close
      </button>
    </div>
  );
}

export default Demo;
