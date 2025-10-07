import React from "react";

// currentStep: 1 (cart), 2 (checkout), 3 (confirm)
export default function Stepper({ currentStep }) {
    const steps = [
        { label: "Giỏ hàng" },
        { label: "Thông tin giao hàng" },
        { label: "Hoàn tất" }
    ];

    return (
        <div className="flex items-center justify-center mb-10 gap-4 text-sm font-medium text-gray-600">
            {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isActive = currentStep === stepNum;
                const isDone = currentStep > stepNum;

                return (
                    <div key={step.label} className="flex items-center gap-2">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full text-base font-semibold border-2
              ${isActive
                                ? "bg-blue-500 text-white border-blue-500"
                                : isDone
                                    ? "bg-green-500 text-white border-green-500"
                                    : "bg-gray-200 text-gray-500 border-gray-300"}
            `}>
                            {isDone ? <span>✓</span> : stepNum}
                        </div>
                        <div className="w-24 text-center">
                            <span className={`${isActive || isDone ? "text-black" : "text-gray-400"}`}>{step.label}</span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
