import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function EditExamScheduleModal({ onClose, examId, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Helper to format date for input type=date
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  // 🔹 Fetch exam data by ID
  const fetchExam = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${api}/exam-schedule/${examId}`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );

      if (res.data.status) {
        const exam = res.data.data;
        setFormData({
          name: exam.name || "",
          year: exam.year || "",
          status: exam.status || "active",
          lastRegistrationDate: formatDateForInput(exam.lastRegistrationDate),
          onlineExamDate: formatDateForInput(exam.onlineExamDate),
          onlineExamResultDate: formatDateForInput(exam.onlineExamResultDate),
          onlineLiveInterviewDate: formatDateForInput(exam.onlineLiveInterviewDate),
          finalResultDate: formatDateForInput(exam.finalResultDate),
          amount: exam.amount || "",
          examFormat: exam.examFormat || "online",
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch exam data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examId) fetchExam();
  }, [examId]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save changes
  const handleSave = async () => {
    const { name, year, lastRegistrationDate, amount } = formData;

    if (!name || !year || !lastRegistrationDate || !amount) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const res = await axios.put(
        `${api}/exam-schedule/${examId}`,
        formData
      );

      if (res.data.status) {
        onSuccess?.(); // refresh list
        onClose();
        toast.success("Updated Succesfully")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update exam");
      toast.error("Failed to update")
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white px-6 py-4 rounded-lg shadow text-gray-700">
          Loading exam data...
        </div>
      </div>
    );
  }

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
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Exam Schedule
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
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
          <Input label="Exam Name *" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Year *" type="number" name="year" value={formData.year} onChange={handleChange} />
          <Input label="Registration Date *" type="date" name="lastRegistrationDate" value={formData.lastRegistrationDate} onChange={handleChange} />
          <Input label="Online Exam Date" type="date" name="onlineExamDate" value={formData.onlineExamDate} onChange={handleChange} />
          <Input label="Online Exam Result Date" type="date" name="onlineExamResultDate" value={formData.onlineExamResultDate} onChange={handleChange} />
          <Input label="Online Interview Date" type="date" name="onlineLiveInterviewDate" value={formData.onlineLiveInterviewDate} onChange={handleChange} />
          <Input label="Final Result Date *" type="date" name="finalResultDate" value={formData.finalResultDate} onChange={handleChange} />
          <Input label="Amount *" type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} />

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Status *
            </label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Exam Format */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Exam Format
            </label>
            <select name="examFormat" value={formData.examFormat} onChange={handleChange} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-4 rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 font-semibold text-gray-700 hover:bg-gray-200 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// 🔹 Reusable Input Component
function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
      <input {...props} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
    </div>
  );
}

export default EditExamScheduleModal;
