import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteTeacherModal({
  teacherId,
  teacherName,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        `http://localhost:3000/api/v1/teachers/${teacherId}`
      );

      toast.success("Teacher deleted successfully");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-red-600">
            Delete Teacher
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-gray-700">
            Are you sure you want to delete
            <span className="font-semibold text-red-600">
              {" "} {teacherName}
            </span>
            ?
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4  bg-gray-50 rounded-xl">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
