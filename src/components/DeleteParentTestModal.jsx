import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function DeleteParentTestimonialModal({
//   isOpen,
  onClose,
//   onConfirm,
}) {
//   if (!isOpen) return null;

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
              className="px-5 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // onConfirm();
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteParentTestimonialModal;
