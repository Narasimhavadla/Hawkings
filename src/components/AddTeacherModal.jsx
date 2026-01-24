import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

/* 🔹 Class Options */
const CLASS_OPTIONS = [
  "Class-4",
  "Class-5",
  "Class-6",
  "Class-7",
  "Class-8",
  "Class-9",
];

export default function AddTeacherModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    school: "",
    qualification: "",
    phone: "",
    email: "",
    upiId: "",
    teachingType: "",
    teachingFrom: "",
    teachingTo: "",
    role : "teacher"
  });

  const [loading, setLoading] = useState(false);

  /* 🔹 Handle input change with range validation */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent invalid class range
    if (name === "teachingFrom" && form.teachingTo) {
      if (
        CLASS_OPTIONS.indexOf(value) >
        CLASS_OPTIONS.indexOf(form.teachingTo)
      ) {
        toast.warning("From class cannot be higher than To class");
        return;
      }
    }

    if (name === "teachingTo" && form.teachingFrom) {
      if (
        CLASS_OPTIONS.indexOf(value) <
        CLASS_OPTIONS.indexOf(form.teachingFrom)
      ) {
        toast.warning("To class cannot be lower than From class");
        return;
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* 🔹 Submit form */
  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.school ||
      !form.phone ||
      !form.email ||
      !form.qualification
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/api/v1/teachers", form);

      toast.success("Teacher created successfully");

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create teacher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[80vh] md:max-h-[90vh] overflow-y-auto">

        {/* 🔹 Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add Teacher
            </h2>
            <p className="text-sm text-gray-500">
              Enter teacher registration details
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* 🔹 Body */}
        <div className="p-6 space-y-6">

          {/* Personal Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name *" name="name" onChange={handleChange} />
              <Input label="School *" name="school" onChange={handleChange} />
              <Input
                label="Qualification *"
                name="qualification"
                onChange={handleChange}
              />
              <Input label="Phone *" name="phone" onChange={handleChange} />
              <Input
                label="Email *"
                name="email"
                type="email"
                onChange={handleChange}
              />
              <Input label="UPI ID" name="upiId" onChange={handleChange} />
            </div>
          </div>

          {/* Teaching Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Teaching Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Teaching Type */}
              <div>
                <label className="field-label">Teaching Type</label>
                <select
                  name="teachingType"
                  value={form.teachingType}
                  onChange={handleChange}
                  className="field-input"
                >
                  <option value="">Select</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                  <option value="Both">Both</option>
                </select>
              </div>

              {/* Teaching Range */}
              <div>
                <label className="field-label">Teaching Range</label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="teachingFrom"
                    value={form.teachingFrom}
                    onChange={handleChange}
                    className="field-input"
                  >
                    <option value="">From</option>
                    {CLASS_OPTIONS.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>

                  <select
                    name="teachingTo"
                    value={form.teachingTo}
                    onChange={handleChange}
                    className="field-input"
                  >
                    <option value="">To</option>
                    {CLASS_OPTIONS.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 🔹 Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Input Component */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input {...props} className="field-input" />
    </div>
  );
}
