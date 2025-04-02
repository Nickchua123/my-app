// src/components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          &lt;
        </button>
  
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 border rounded-lg ${
              currentPage === page
                ? "bg-orange-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
  
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          &gt;
        </button>
      </div>
    );
  }
  