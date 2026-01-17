import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function EditExamScheduleModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative bg-white w-[95%] max-w-5xl rounded-2xl shadow-2xl
          max-h-[75vh] overflow-y-auto
        "
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Exam Schedule
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Exam Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Exam Name *
            </label>
            <input
              type="text"
            //   defaultValue={exam?.name}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Year */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Year *
            </label>
            <input
              type="number"
            //   defaultValue={exam?.year}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Registration Date */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Registration Date *
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Online Exam Date */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Online Exam Date *
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Result Date */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Online Exam Result Date *
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Interview Date */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Online Interview Date
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Final Result Date */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Final Result Date *
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Amount *
            </label>
            <input
              type="number"
              step="0.01"
            //   defaultValue={exam?.amount}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Status *
            </label>
            <select
            //   defaultValue={exam?.status || "active"}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 font-semibold text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditExamScheduleModal;
