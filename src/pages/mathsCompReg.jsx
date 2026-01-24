import { useState } from "react";
import axios from "axios";
import StudentForm from "../forms/StudentForm";
import TeacherRegistration from "../forms/TeacherRegistration";

function MathsCompReg() {
  const [activeForm, setActiveForm] = useState("student"); // student | teacher
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ Handle Student Form Submission
 // ✅ Handle Student Form Submission
const handleSubmitStudent = async (studentData) => {
  try {
    setLoading(true);
    setSuccessMessage("");

    // Add default Status before sending to backend
    const payload = { ...studentData, Status: "pending" };

    const response = await axios.post(
      "http://localhost:3000/api/v1/student",
      payload
    );

    setSuccessMessage("Student registered successfully!");
    // console.log("Student Response:", response.data);
  } catch (err) {
    console.error(err);
    alert(
      err?.response?.data?.message || "Failed to register student. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  // ✅ Handle Teacher Form Submission
 const handleSubmitTeacher = async (teacherData) => {
  try {
    setLoading(true);
    setSuccessMessage("");

    // 🔁 Map frontend → backend fields
    const payload = {
      name: teacherData.name,
      school: teacherData.school,
      qualification: teacherData.qualification,
      phone: teacherData.phone,
      teachingType: teacherData.teachingType,
      email: teacherData.email,
      upiId: teacherData.upiId,
      teachingFrom: teacherData.classFrom,
      teachingTo: teacherData.classTo,
      // Status: "pending" // only if backend later needs it
      role : "teacher"
    };

    const response = await axios.post(
      "http://localhost:3000/api/v1/teachers",
      payload
    );

    setSuccessMessage("Teacher registered successfully!");
    console.log("Teacher Response:", response.data);
  } catch (err) {
    console.error(err);
    alert(
      err?.response?.data?.message ||
      "Failed to register teacher. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen py-6 px-4 bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700">
          Hawking’s National Maths Competition
        </h1>
        <p className="text-gray-600 mt-2 text-base md:text-lg">
          A prestigious platform for young minds to explore logic, reasoning, and excellence
        </p>
      </div>

      {/* Toggle Button */}
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
      <div className="max-w-5xl mx-auto transition-all duration-300">
        {activeForm === "student" ? (
          <StudentForm
            onSubmit={handleSubmitStudent}
            loading={loading}
            successMessage={successMessage}
          />
        ) : (
          <TeacherRegistration
            onSubmit={handleSubmitTeacher}
            loading={loading}
            successMessage={successMessage}
          />
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
      className={`w-1/2 py-3 text-sm md:text-base font-semibold rounded-lg transition-all
        ${active ? "bg-indigo-600 text-white shadow" : "text-gray-600 hover:bg-indigo-50"}`}
    >
      {label}
    </button>
  );
}
