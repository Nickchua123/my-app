import React from 'react';
import "../styles/CheckoutForm.scss";

export default function CheckoutForm() {
  return (
    <div className="form-section">
      <form>
        <div className="row">
          <input className="half-width" placeholder="Họ *" required />
          <input className="half-width" placeholder="Tên *" required />
        </div>
        <input className="full-width" placeholder="Quốc gia/Khu vực *" defaultValue="Việt Nam" required />
        <input className="full-width" placeholder="Địa chỉ *" required />
        <div className="row">
          <input className="third-width" placeholder="Huyện/Quận *" required />
          <input className="third-width" placeholder="Tỉnh/Thành phố *" required />
          <input className="third-width" placeholder="Mã bưu điện *" required />
        </div>
        <div className="row">
          <input className="half-width" placeholder="Số điện thoại *" required />
          <input className="half-width" placeholder="Email *" type="email" required />
        </div>
        <label>
          <input type="checkbox" /> Gửi đến địa chỉ khác
        </label>
        <textarea className="full-width" placeholder="Ghi chú (Không bắt buộc)"></textarea>
      </form>
    </div>
  );
}