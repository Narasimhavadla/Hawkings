import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/v1/parent-testimonials";

function DeleteParentTestimonialModal({
  selectTestId,
  onClose,
  refresh,
}) {
  const [loading, setLoading] = useState(false);

  // if (!testimonial) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(`${API_URL}/${selectTestId}`);

      refresh();   // 🔥 refresh parent list
      onClose();   // close modal
      toast.success("Deleted Succesfully")
    } catch (error) {
      console.error("Delete failed:", error.response || error.message);
      // alert("Failed to delete testimonial");
      toast.error("Failed to Delete")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl animate-scaleIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-red-600 text-3xl"
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            Delete Testimonial?
          </h2>

          <p className="text-gray-500 mt-2">
            This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteParentTestimonialModal;
