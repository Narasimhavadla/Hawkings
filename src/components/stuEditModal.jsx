import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function EditStudentModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm "
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[95%] max-w-5xl rounded-2xl shadow-2xl animate-scaleIn h-[75vh] md:h-auto overflow-hidden overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Student
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Class */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Class *
            </label>
            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
              <option>Class 9</option>
              <option>Class 10</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Student Name *
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Father Name */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Father Name *
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Email *
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Phone Number *
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Alternate Phone */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Alternate Phone
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Date of Birth *
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Institute */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Institute Name *
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* State */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              State *
            </label>
            <select className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Tamil Nadu</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              City *
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* Pincode */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Pin Code *
            </label>
            <input className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 font-semibold text-gray-700 hover:bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditStudentModal;

