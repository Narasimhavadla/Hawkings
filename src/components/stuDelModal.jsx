import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import{toast} from 'react-toastify'

const API_URL = "http://localhost:3000/api/v1/student";

function StuDeleteModal({ onClose, studentId, refresh }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${studentId}`);
      refresh();
      onClose();
      toast.success("Deleted Succesfully")
    } catch (error) {
      console.error(error);
      toast.error("Failed to Deleted ")
      // alert("Failed to delete student");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 text-center">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="text-red-600 text-3xl mb-4"
        />

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this record?
          <br />
          <span className="text-red-600 font-semibold">
            This action cannot be undone.
          </span>
        </p>

        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="border px-5 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default StuDeleteModal;
