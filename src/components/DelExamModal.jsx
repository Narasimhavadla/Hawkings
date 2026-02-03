import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function DeleteExamScheduleModal({ examId, examName, onClose,refresh }) {
//   const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const api =import.meta.env.VITE_API_BASE_URL

const token = localStorage.getItem("token")


  const handleDelete = async () => {
    try {
    //   setLoading(true);
      setError("");

      const res = await axios.delete(
        `${api}/exam-schedule/${examId}`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );

    
        refresh()
        onClose();
        
        toast.success("Delete Succesfull")
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete exam schedule");
      toast.error("Failed to Delete")
    } finally {
    //   setLoading(false);
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
      <div className="relative bg-white w-[95%] max-w-md rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Delete Exam Schedule
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600">
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </div>

          <p className="text-gray-700">
            Are you sure you want to delete
          </p>
          <p className="font-semibold text-gray-900 mt-1">
            {examName || "this exam"}?
          </p>

          <p className="text-sm text-gray-500 mt-2">
            This action cannot be undone.
          </p>

          {error && (
            <div className="mt-4 text-sm bg-red-50 text-red-600 px-3 py-2 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            // disabled={loading}
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            // disabled={loading}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {/* {loading ? "Deleting..." : "Delete"} */}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteExamScheduleModal;
