function DeleteConfirmModal({ isOpen, title, description, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0 " onClick={onClose} />

      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 animate-scaleIn">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-500 mt-2">{description}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
