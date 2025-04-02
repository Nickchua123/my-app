import { createPortal } from "react-dom";

export default function PortalModal({ show, title, children, onClose }) {
  if (!show) return null;
  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="relative bg-white dark:bg-gray-900 rounded-md p-6 w-80">
        <h2 id="modal-title" className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          ✖
        </button>
      </div>
    </div>,
    document.getElementById("portal-root") // Gắn vào thẻ ngoài body
  );
}
