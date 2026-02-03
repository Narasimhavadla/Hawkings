import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function AddExamScheduleModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    examName: "",
    year: "",
    status: "active",
    lastRegistrationDate: "",
    onlineExamDate: "",
    onlineExamResultDate: "",
    onlineLiveInterviewDate: "",
    finalResultDate: "",
    amount: "",
    examFormat: "online",
  });

const api =import.meta.env.VITE_API_BASE_URL

const token = localStorage.getItem("token")


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSave = async () => {
    const {
      // examName,
      // year,
      // status,
      // lastRegistrationDate,
      // onlineExamDate,
      // amount,
    examName,
    year,
    status,
    lastRegistrationDate,
    onlineExamDate,
    onlineExamResultDate,
    onlineLiveInterviewDate,
    finalResultDate,
    amount,
    examFormat
      
    } = formData;

    // 🔴 Required field validation
    if (!examName || !year || !status || !lastRegistrationDate || !amount) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${api}/exam-schedule`,
        formData,{
          headers : {
            Authorization :`Bearer ${token}`
          }
        }
      );

      if (res.data.status) {
        onSuccess?.(); // refresh list
        onClose();
        toast.success("Created Succesfully")
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create exam schedule"
      );
        toast.error("Failed to create")

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
      <div className="relative bg-white w-[95%] max-w-5xl rounded-2xl shadow-2xl max-h-[75vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarPlus} className="text-indigo-600" />
            <h2 className="text-xl font-semibold">Add Exam Schedule</h2>
          </div>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-6 mt-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Input label="Exam Name *" name="examName" value={formData.examName} onChange={handleChange} />
          <Input label="Year *" type="number" name="year" value={formData.year} onChange={handleChange} />
          <Input label="Registration Last Date *" type="date" name="lastRegistrationDate" value={formData.lastRegistrationDate} onChange={handleChange} />
          <Input label="Online Exam Date" type="date" name="onlineExamDate" value={formData.onlineExamDate} onChange={handleChange} />
          <Input label="Online Exam Result Date" type="date" name="onlineExamResultDate" value={formData.onlineExamResultDate} onChange={handleChange} />
          <Input label="Online Interview Date" type="date" name="onlineLiveInterviewDate" value={formData.onlineLiveInterviewDate} onChange={handleChange} />
          <Input label="Final Result Date" type="date" name="finalResultDate" value={formData.finalResultDate} onChange={handleChange} />
          <Input label="Amount (₹) *" type="number" name="amount" value={formData.amount} onChange={handleChange} />

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Exam Format */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Exam Format
            </label>
            <select
              name="examFormat"
              value={formData.examFormat}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-4">
          <button onClick={onClose} className="px-5 py-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Exam"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Reusable Input Component */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 mb-1 block">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default AddExamScheduleModal;
