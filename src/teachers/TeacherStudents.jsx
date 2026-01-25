import { useState } from "react";

export default function TeacherStudents() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [forms, setForms] = useState([initialForm()]);

  const exams = [
    {
      id: 1,
      name: "Hawking Maths Olympiad – Level 1",
      classes: "Class 4 – 6",
      fee: "₹150 / student",
    },
    {
      id: 2,
      name: "Hawking Junior Maths Challenge",
      classes: "Class 3 – 5",
      fee: "₹120 / student",
    },
    {
      id: 3,
      name: "Hawking Senior Maths Olympiad",
      classes: "Class 7 – 9",
      fee: "₹200 / student",
    },
  ];

  function initialForm() {
    return {
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
    };
  }

  const selectExam = (exam) => {
    setSelectedExam(exam);
    setForms([initialForm()]); // reset forms when exam changes
  };

  const handleChange = (index, e) => {
    const updated = [...forms];
    updated[index][e.target.name] = e.target.value;
    setForms(updated);
  };

  const addForm = () => setForms([...forms, initialForm()]);
  const removeForm = (index) =>
    setForms(forms.filter((_, i) => i !== index));

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold">
          Register Students – Hawking Maths Olympiad
        </h1>

        {/* ================= EXAM CARDS ================= */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">
            Select Exam
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => {
              const active = selectedExam?.id === exam.id;

              return (
                <div
                  key={exam.id}
                  onClick={() => selectExam(exam)}
                  className={`cursor-pointer rounded-2xl border p-5 shadow transition
                    ${
                      active
                        ? "border-indigo-600 bg-indigo-50"
                        : "bg-white hover:border-indigo-400"
                    }`}
                >
                  <h3 className="mb-2 text-lg font-semibold">
                    {exam.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Eligible: {exam.classes}
                  </p>
                  <p className="mt-2 text-sm font-medium text-indigo-600">
                    Fee: {exam.fee}
                  </p>

                  {active && (
                    <span className="mt-3 inline-block rounded-full bg-indigo-600 px-4 py-1 text-xs text-white">
                      Selected
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= STUDENT FORMS ================= */}
        {selectedExam && (
          <>
            <div className="mb-4 rounded-xl bg-indigo-600 p-4 text-white">
              <p className="text-sm">Selected Exam</p>
              <h3 className="text-lg font-semibold">
                {selectedExam.name}
              </h3>
            </div>

            {forms.map((form, index) => (
              <div
                key={index}
                className="mb-6 rounded-2xl bg-white p-6 shadow"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">
                    Student {index + 1}
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={addForm}
                      className="rounded-full bg-green-500 px-3 py-1 text-white"
                    >
                      +
                    </button>
                    {forms.length > 1 && (
                      <button
                        onClick={() => removeForm(index)}
                        className="rounded-full bg-red-500 px-3 py-1 text-white"
                      >
                        −
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Field
                    label="Student Name"
                    name="name"
                    value={form.name}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="Father Name"
                    name="fathername"
                    value={form.fathername}
                    onChange={(e) => handleChange(index, e)}
                  />

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">
                      Class
                    </label>
                    <select
                      name="Class"
                      value={form.Class}
                      onChange={(e) => handleChange(index, e)}
                      className="h-11 rounded-lg border px-3"
                    >
                      <option value="">Select Class</option>
                      {[4, 5, 6, 7, 8, 9].map((c) => (
                        <option key={c} value={`Class-${c}`}>
                          Class {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="Alternate Phone"
                    name="altphone"
                    value={form.altphone}
                    onChange={(e) => handleChange(index, e)}
                  />

                  <Field
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={form.dob}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="Institute"
                    name="institute"
                    value={form.institute}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={(e) => handleChange(index, e)}
                  />
                  <Field
                    label="Pincode"
                    name="pincode"
                    value={form.pincode}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            ))}

            {/* ================= SUBMIT ================= */}
            <div className="flex justify-end">
              <button className="rounded-xl bg-indigo-600 px-6 py-3 text-white shadow">
                Submit All Students
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= FIELD COMPONENT ================= */

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 rounded-lg border px-3 focus:border-indigo-500 focus:outline-none"
      />
    </div>
  );
}
