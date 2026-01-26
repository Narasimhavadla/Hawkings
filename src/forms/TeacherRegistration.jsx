import { useState } from "react";

export default function TeacherRegistration({ onSubmit, loading, successMessage }) {
  const [form, setForm] = useState({
    name: "",
    school: "",
    phone: "",
    qualification: "",
    teachingFrom: "",
    teachingTo: "",
    teachingType: "",
    email: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, role: "teacher", [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl md:p-10 p-6 space-y-5 max-w-4xl mx-auto"
    >
      {successMessage && (
        <div className="text-green-600 font-semibold text-center">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="School" name="school" value={form.school} onChange={handleChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Qualification" name="qualification" value={form.qualification} onChange={handleChange} />
        <Select label="Type of Teaching" name="teachingType" value={form.teachingType} onChange={handleChange} options={["Online","Offline","Hybrid"]} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="UPI ID" name="upiId" value={form.upiId} onChange={handleChange} />
      </div>

      <div className="bg-indigo-50 p-3 rounded-xl">
        <h3 className="font-semibold text-indigo-700 mb-2">
          Class Teaching Range
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="From" name="teachingFrom" value={form.teachingFrom} onChange={handleChange} options={["Class-4","Class-5","Class-6","Class-7","Class-8","Class-9"]} />
          <Select label="To" name="teachingTo" value={form.teachingTo} onChange={handleChange} options={["Class-4","Class-5","Class-6","Class-7","Class-8","Class-9"]} />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all disabled:opacity-60"
      >
        Register Teacher
      </button>
    </form>
  );
}

/* ---------- Inputs ---------- */
function Input({ label, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-600">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        {...props}
        className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-600">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        {...props}
        className="px-4 py-2 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
