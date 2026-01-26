export default function LoadingModal({ show, message }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl px-8 py-6 w-[90%] max-w-sm text-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

        <h3 className="text-lg font-semibold text-gray-800">
          Please wait
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          {message || "This may take a moment..."}
        </p>
      </div>
    </div>
  );
}
