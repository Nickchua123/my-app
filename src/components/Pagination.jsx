export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        type="button" // ✅ tránh hành vi submit nếu trong form
        onClick={(e) => {
          e.preventDefault();
          onPageChange(page - 1);
        }}
        disabled={page === 0}
        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        ◀ Trang trước
      </button>

      <span className="font-medium text-gray-700 mt-2">
        Trang {page + 1} / {totalPages}
      </span>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          onPageChange(page + 1);
        }}
        disabled={page + 1 >= totalPages}
        className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
      >
        Trang sau ▶
      </button>
    </div>
  );
}
