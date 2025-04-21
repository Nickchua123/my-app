import React from "react";
import "../styles/Delivery.scss";
import { FaTruck, FaStore, FaBox} from "react-icons/fa"; // import icon

export default function DeliveryInfo() {
  return (
    <div className="delivery-info">
      <div className="delivery-card">
        <FaBox className="icon" />
        <p className="title">Vận Chuyển</p>
      <div>
        <p className="top"> Đặt hàng trước 10 giờ tối để được giao hàng miễn phí vào ngày hôm sau cho đơn hàng trên 100$.</p>
        <p className="bot">Giao hàng từ Thứ Hai đến Thứ Bảy, không kể các ngày lễ.</p>
      </div>
      </div>
      <div className="delivery-card">
        <FaStore className="icon" />
        <p className="title">Giao Hàng</p>
        <p>Giao hàng miễn phí đến cửa hàng vào ngày hôm sau.</p>
        <p className="bot">Phí giao hàng tận nhà là 4.99$ cho đơn hàng dưới 100$ và MIỄN PHÍ cho đơn hàng trên 100$.</p>
      </div>
      <div className="delivery-card">
       <FaTruck className="icon" />
        <p className="title">Hoàn Trả Miễn Phí</p>
        <p>Trả hàng trong 30 ngày để được hoàn tiền. Dễ dàng trả tại cửa hàng hoặc gửi qua FedEx miễn phí!</p>
      </div>
    </div>
  );
}