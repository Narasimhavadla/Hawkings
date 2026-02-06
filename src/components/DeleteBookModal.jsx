import axios from "axios";
import { toast } from "react-toastify";


export default function DeleteBookModal({
  book,
  onClose,
  onDeleted,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/books/${book.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // send deleted id back to parent
      onDeleted(book.id);
      toast.success("Deleted Succesfully")
      

      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center">
        
        {/* TITLE */}
        <h2 className="text-xl font-bold mb-3 text-red-600">
          Delete Book
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <br />
          <span className="font-semibold text-black">
            {book?.bookName}
          </span>
          ?
        </p>

        {/* ACTIONS */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
