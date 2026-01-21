import { useState } from "react";

const classOptions = [
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
];

export default function TeacherRegistration() {
  const [form, setForm] = useState({
    name: "",
    school: "",
    qualification: "",
    classFrom: "",
    classTo: "",
    teachingType: "",
    email: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Teacher Registration Data:", form);
    // axios.post("/api/teacher/register", form)
  };

  return (
    <div className="min-h-3/4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl md:p-10 space-y-5"
      >
        {/* <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-600">
          Teacher Registration
        </h2> */}

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-5">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter teacher name"
          />

          <Input
            label="School"
            name="school"
            value={form.school}
            onChange={handleChange}
            placeholder="School name"
          />

          <Input
            label="Qualification"
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            placeholder="B.Ed / M.Sc / etc"
          />

          <Select
            label="Type of Teaching"
            name="teachingType"
            value={form.teachingType}
            onChange={handleChange}
            options={["Online", "Offline", "Hybrid"]}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="teacher@email.com"
          />

          <Input
            label="UPI ID"
            name="upiId"
            value={form.upiId}
            onChange={handleChange}
            placeholder="example@upi"
          />
        </div>

        {/* Class Range */}
        <div className="bg-indigo-50 p-2 rounded-xl">
          <h3 className="font-semibold text-indigo-700 mb-1">
            Class Teaching Range
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="From"
              name="classFrom"
              value={form.classFrom}
              onChange={handleChange}
              options={classOptions}
            />

            <Select
              label="To"
              name="classTo"
              value={form.classTo}
              onChange={handleChange}
              options={classOptions}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}

/* ---------- Reusable Components ---------- */

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-600">{label} <span className="text-red-500"> *</span></label>
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
      <label className="text-sm font-medium text-gray-600">{label} <span className="text-red-500"> *</span></label>
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
