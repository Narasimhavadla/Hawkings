import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,faTriangleExclamation 
} from "@fortawesome/free-solid-svg-icons";

function StuDeleteModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-[90%] max-w-md">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-red-600 text-3xl"
            />
          </div>

          <p className="text-gray-500 mt-2">
            Are you sure you want to delete this record?
            <br />
            <span className="text-red-600 font-semibold">
              This action cannot be undone.
            </span>
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StuDeleteModal;
