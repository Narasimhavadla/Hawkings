import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CLASS_OPTIONS = [
  "Class-4",
  "Class-5",
  "Class-6",
  "Class-7",
  "Class-8",
  "Class-9",
];

const TEACHING_TYPES = ["Online", "Offline", "Both"];

export default function EditTeacherModal({ teacher, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: teacher.name || "",
    school: teacher.school || "",
    qualification: teacher.qualification || "",
    phone: teacher.phone || "",
    email: teacher.email || "",
    upiId: teacher.upiId || "",
    teachingType: teacher.teachingType || "",
    teachingFrom: teacher.teachingFrom || "",
    teachingTo: teacher.teachingTo || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.put(
        `http://localhost:3000/api/v1/teachers/${teacher.id}`,
        form
      );

      toast.success("Teacher updated successfully ");
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Edit Teacher Details
            </h2>
            <p className="text-sm text-gray-500">
              Update teacher information
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-3 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Name */}
          <Field label="Name">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="field-input"
            />
          </Field>

          {/* School */}
          <Field label="School">
            <input
              name="school"
              value={form.school}
              onChange={handleChange}
              className="field-input"
            />
          </Field>

          {/* Qualification */}
          <Field label="Qualification">
            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              className="field-input"
            />
          </Field>

          {/* Phone */}
          <Field label="Phone">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="field-input"
            />
          </Field>

          {/* Email */}
          <Field label="Email">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="field-input"
            />
          </Field>

          {/* UPI ID */}
          <Field label="UPI ID">
            <input
              name="upiId"
              value={form.upiId}
              onChange={handleChange}
              className="field-input"
            />
          </Field>

          {/* Teaching Type */}
          <Field label="Teaching Type">
            <select
              name="teachingType"
              value={form.teachingType}
              onChange={handleChange}
              className="field-input"
            >
              <option value="">Select</option>
              {TEACHING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          {/* Teaching From */}
          <Field label="Teaching From">
            <select
              name="teachingFrom"
              value={form.teachingFrom}
              onChange={handleChange}
              className="field-input"
            >
              <option value="">Select Class</option>
              {CLASS_OPTIONS.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </Field>

          {/* Teaching To */}
          <Field label="Teaching To">
            <select
              name="teachingTo"
              value={form.teachingTo}
              onChange={handleChange}
              className="field-input"
            >
              <option value="">Select Class</option>
              {CLASS_OPTIONS.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Small helper for consistent UI */
function Field({ label, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}
