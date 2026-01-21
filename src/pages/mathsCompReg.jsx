import { useState } from "react";
import StudentForm from "../forms/studentForm";
import TeacherRegistration from "../forms/TeacherRegistration";

function MathsCompReg() {
  const [activeForm, setActiveForm] = useState("student"); // student | teacher

  return (
    <div className="min-h-screen py-2 px-4 bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700">
          Hawking’s National Maths Competition
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          A prestigious platform for young minds to explore logic, reasoning, and excellence
        </p>
      </div>

      {/* Toggle */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex bg-white rounded-xl shadow-md p-1">
          <ToggleButton
            active={activeForm === "student"}
            onClick={() => setActiveForm("student")}
            label="Student Registration"
          />
          <ToggleButton
            active={activeForm === "teacher"}
            onClick={() => setActiveForm("teacher")}
            label="Teacher Registration"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="transition-all duration-300">
        {activeForm === "student" ? (
          <>
            <StudentForm />

            {/* Submit (Student only) */}
            <div className="text-center mt-2">
              <button
                type="button"
                className="px-12 py-2 text-lg font-semibold text-white rounded-lg
                           bg-indigo-600 hover:bg-indigo-700
                           transition shadow-md active:scale-95"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <TeacherRegistration />
        )}
      </div>
    </div>
  );
}

export default MathsCompReg;

/* ---------- Toggle Button ---------- */
function ToggleButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-1/2 py-2 rounded-lg text-sm md:text-base font-semibold transition-all
        ${
          active
            ? "bg-indigo-600 text-white shadow"
            : "text-gray-600 hover:bg-indigo-50"
        }`}
    >
      {label}
    </button>
  );
}
