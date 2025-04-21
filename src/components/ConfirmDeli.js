import React from "react";

export default function ConfirmDeli() {
    return(
        <div className="summary-box">
        <div className="summary-row">
            <span className="label">Vận Chuyển</span>
            <span>New York, US</span>
            <span className="label">Thanh Toán</span>
            <span>$275.00</span>
        </div>

        <div className="summary-row">
            <span className="label">Tùy chọn vận chuyển</span>
            <span>Chuyển phát nhanh</span>
            <span className="label">Giảm Giá</span>
            <span>$0.00</span>
        </div>

        <div className="summary-row">
            <span></span>
            <span></span>
            <span className="label">Phí Vận Chuyển</span>
            <span>$50.00</span>
        </div>

        <div className="summary-total">
            <span>THANH TOÁN</span>
            <span className="total-amount">$325.00</span>
        </div>
    </div>
    )
}
