import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faEnvelope,
  faPhone,
  faSchool,
  faLocationDot,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/v1/student";

export default function EditStudentModal({ onClose, student, refresh }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    Class: "",
    name: "",
    fathername: "",
    email: "",
    phone: "",
    altphone: "",
    dob: "",
    institute: "",
    state: "",
    city: "",
    pincode: "",
    Status: "pending",
  });

  /* Load student data */
  useEffect(() => {
    if (student) {
      setForm({
        id: student.id,
        Class: student.Class || "",
        name: student.name || "",
        fathername: student.fathername || "",
        email: student.email || "",
        phone: student.phone || "",
        altphone: student.altphone || "",
        dob: student.dob ? student.dob.split("T")[0] : "",
        institute: student.institute || "",
        state: student.state || "",
        city: student.city || "",
        pincode: student.pincode || "",
        Status: student.Status || "pending",
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const { id, ...payload } = form;

      await axios.put(`${API_URL}/${id}`, payload);

      toast.success("Student Updated Successfully 🎉");
      refresh();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Update Student ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl h-3/4 overflow-hidden overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Edit Student</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid md:grid-cols-3 gap-6">

          <Input label="Student Name" name="name" icon={faUser} value={form.name} onChange={handleChange} />
          <Input label="Father Name" name="fathername" icon={faUser} value={form.fathername} onChange={handleChange} />

          <select
            name="Class"
            value={form.Class}
            onChange={handleChange}
            className="border rounded-lg h-11 px-3"
          >
            <option value="">Select Class</option>
            <option value="Class-4">Class 4</option>
            <option value="Class-5">Class 5</option>
            <option value="Class-6">Class 6</option>
            <option value="Class-7">Class 7</option>
            <option value="Class-8">Class 8</option>
            <option value="Class-9">Class 9</option>
          </select>

          <Input label="Email" name="email" icon={faEnvelope} value={form.email} onChange={handleChange} />
          <Input label="Phone" name="phone" icon={faPhone} value={form.phone} onChange={handleChange} />
          <Input label="Alternate Phone" name="altphone" icon={faPhone} value={form.altphone} onChange={handleChange} />

          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            icon={faCalendar}
            value={form.dob}
            onChange={handleChange}
          />

          <Input label="Institute" name="institute" icon={faSchool} value={form.institute} onChange={handleChange} />
          <Input label="State" name="state" icon={faLocationDot} value={form.state} onChange={handleChange} />
          <Input label="City" name="city" value={form.city} onChange={handleChange} />
          <Input label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} />

          <select
            name="Status"
            value={form.Status}
            onChange={handleChange}
            className="border rounded-lg h-11 px-3"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Update Student"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, icon, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <div className="relative">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full h-11 border rounded-lg px-3 ${icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}
