import React from 'react';
import "../styles/Stepper.scss";
import { useLocation } from 'react-router-dom';
import { FaShoppingBag, FaCreditCard, FaCheck} from "react-icons/fa"; // import icon


export default function Stepper() {
  const location = useLocation();

  const steps = [
    { label: 'Giỏ Hàng', path: '/' , icon: <FaShoppingBag/> },
    { label: 'Thanh Toán', path: '/checkout', icon: <FaCreditCard/>},
    { label: 'Hoàn Tất Đơn Hàng', path: '/confirmation', icon: <FaCheck/> },
  ];

  return (
    <div className="stepper">
      {steps.map((step, index) => {
        const isActive = location.pathname === step.path;
        return (
          <React.Fragment key={index}>
            <div className={`step ${isActive ? 'active' : ''}`}>
              <div className="circle">{step.icon}</div>
              <span>{step.label}</span>
            </div>
            {index < steps.length - 1 && <div className="line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}