// Component Modal cơ bản
function Modal({ show, title, children, onClose }) {
    if (!show) return null;
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 "
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="relative bg-white rounded-md p-6 w-100">
          <h2 id="modal-title" className="text-xl font-semibold mb-4">{title}</h2>
          {children}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Đóng"
          >
            ✖
          </button>
        </div>
      </div>
    );
  }
  export default Modal;