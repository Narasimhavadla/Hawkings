import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const DELETE_URL = "http://localhost:3000/api/v1/student-testinomials";

function DeleteConfirmModal({ isOpen, testimonialId, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!testimonialId) {
      toast.error("Invalid testimonial ID");
      return;
    }

    try {
      setLoading(true);

      console.log("Deleting ID:", testimonialId); // 🔍 DEBUG

      await axios.delete(`${DELETE_URL}/${testimonialId}`);

      toast.success("Deleted successfully");
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6">
        <h3 className="text-lg font-semibold">Delete Testimonial</h3>
        <p className="text-gray-500 mt-2">
          This action cannot be undone
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
