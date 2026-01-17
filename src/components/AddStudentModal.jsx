import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faEnvelope,
  faPhone,
  faSchool,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

export default function AddStudentModal({ onClose }) {
  const [status, setStatus] = useState("pending");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Student
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InputField icon={faUser} label="Student Name" />
            <InputField label="Class" placeholder="Class 5 / Class 6" />
            <InputField icon={faEnvelope} label="Email" type="email" />
            <InputField icon={faPhone} label="Phone" />
            <InputField icon={faLocationDot} label="State" />
            <InputField label="City" />
            <InputField icon={faSchool} label="Institute Name" />

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full h-11 border rounded-lg px-3 bg-white
                focus:outline-none`
            }
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg
            hover:bg-indigo-700 active:scale-95 transition"
          >
            Save Student
          </button>
        </div>

      </div>
    </div>
  );
}

/* ---------- INPUT FIELD ---------- */
function InputField({
  label,
  icon,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          type={type}
          placeholder={placeholder}
          className={`w-full h-11 border rounded-lg px-3
          ${icon ? "pl-9" : ""}
           focus:outline-none`}
        />
      </div>
    </div>
  );
}
