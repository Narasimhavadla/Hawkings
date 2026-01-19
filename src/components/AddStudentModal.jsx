import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUser,
  faEnvelope,
  faPhone,
  faSchool,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import {toast} from "react-toastify"

const API_URL = "http://localhost:3000/students";

export default function AddStudentModal({ onClose, refresh }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    class: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    institute: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(API_URL, form);
      refresh(); 
      onClose();
      toast.success("Student Added");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Add")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Add Student</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          <Input label="Student Name" name="name" icon={faUser} onChange={handleChange} />
          {/* <Input label="Class" name="class" onChange={handleChange} /> */}
          
          <select
            // label = ""
            name="Class"
            value={form.class}
            onChange={handleChange}
            className="border rounded-lg h-11 px-3 "
          >
            <option value="class-4">class-4</option>
            <option value="class-5">class-5</option>
            <option value="class-4">class-6</option>
            <option value="class-4">class-7</option>
            <option value="class-4">class-8</option>
            <option value="class-4">class-9</option>
            
          </select>
          <Input label="Email" name="email" icon={faEnvelope} onChange={handleChange} />
          <Input label="Phone" name="phone" icon={faPhone} onChange={handleChange} />
          <Input label="State" name="state" icon={faLocationDot} onChange={handleChange} />
          <Input label="City" name="city" onChange={handleChange} />
          <Input label="Institute" name="institute" icon={faSchool} onChange={handleChange} />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-lg h-11 px-3"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Student"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, name, onChange }) {
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
          name={name}
          onChange={onChange}
          className={`w-full h-11 border rounded-lg px-3 ${icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}
