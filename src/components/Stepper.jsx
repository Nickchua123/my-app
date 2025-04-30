import React from "react";

// currentStep: 1 (cart), 2 (checkout), 3 (confirm)
export default function Stepper({ currentStep }) {
    const steps = [
        { label: "Giỏ hàng" },
        { label: "Thông tin giao hàng" },
        { label: "Hoàn tất" }
    ];

    return (
        <div className="flex items-center justify-center mb-8 gap-2">
            {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep === stepNum;
                const isDone = currentStep > stepNum;
                return (
                    <div className="flex items-center" key={step.label}>
                        <div className={`rounded-full w-10 h-10 flex items-center justify-center font-bold border-2
              ${isActive ? "bg-orange-500 text-white border-orange-500" : isDone ? "bg-green-400 text-white border-green-400" : "bg-gray-200 text-gray-400 border-gray-300"}
            `}>
                            {isDone ? <span>✓</span> : stepNum}
                        </div>
                        <div className="text-xs text-center mt-1 w-20 mx-1">{step.label}</div>
                        {idx < steps.length - 1 && (
                            <div className="w-8 h-1 bg-gray-300 mx-2 rounded"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
