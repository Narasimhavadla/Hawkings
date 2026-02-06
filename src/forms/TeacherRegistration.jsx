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
    refferCode: "",
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
      className="bg-white rounded-2xl shadow-xl md:p-10 p-6 space-y-6 max-w-4xl mx-auto"
    >
      {successMessage && (
        <div className="text-green-600 font-semibold text-center">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Input label="Full Name" name="name" required value={form.name} onChange={handleChange} />
        <Input label="School" name="school" required value={form.school} onChange={handleChange} />
        <Input label="Phone" name="phone" required value={form.phone} onChange={handleChange} />
        <Input label="Qualification" name="qualification" required value={form.qualification} onChange={handleChange} />

        {/* <Select
          label="Type of Teaching"
          name="teachingType"
          value={form.teachingType}
          onChange={handleChange}
          options={["Online", "Offline", "Hybrid"]}
        /> */}

        <Input label="Email" name="email" type="email" required value={form.email} onChange={handleChange} />
        <Input label="UPI ID" name="upiId" value={form.upiId} onChange={handleChange} />

        {/* ⭐ Referral Code – Enhanced UX */}
        <ReferralInput
          name="refferCode"
          value={form.refferCode}
          onChange={handleChange}
        />
      </div>

      <div className="bg-indigo-50 p-4 rounded-xl">
        <h3 className="font-semibold text-indigo-700 mb-3">
          Class Teaching Range <span className="text-sm text-gray-500">(optional)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="From"
            name="teachingFrom"
            value={form.teachingFrom}
            onChange={handleChange}
            options={["Class-4","Class-5","Class-6","Class-7","Class-8","Class-9"]}
          />
          <Select
            label="To"
            name="teachingTo"
            value={form.teachingTo}
            onChange={handleChange}
            options={["Class-4","Class-5","Class-6","Class-7","Class-8","Class-9"]}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-green-700 transition-all disabled:opacity-60"
      >
        Register Teacher
      </button>
    </form>
  );
}


function Input({ label, required, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-600">
        {label}
        {required ? (
          <span className="text-red-500 ml-1">*</span>
        ) : (
          <span className="text-xs text-gray-400 ml-1">(optional)</span>
        )}
      </label>
      <input
        {...props}
        required={required}
        className="px-4 py-1 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}

function Select({ label, options, required, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-600">
        {label}
        {required ? (
          <span className="text-red-500 ml-1">*</span>
        ) : (
          <span className="text-xs text-gray-400 ml-1">(optional)</span>
        )}
      </label>
      <select
        {...props}
        required={required}
        className="px-4 py-1 rounded-lg border bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
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


function ReferralInput({ value, onChange, name }) {
  return (
    <div className="flex flex-col space-y-1 md:col-span-3">
      <label className="text-sm font-medium text-gray-600">
        Referral Code <span className="text-xs text-gray-400">(optional)</span>
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Enter referral code (if any)"
        className="px-4 py-2 rounded-lg border border-dashed bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
      />

      <p className="text-xs text-gray-500">
        Have a referral code? Enter it here to unlock special benefits.
      </p>
    </div>
  );
}
