import { faCheck, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function TeacherStudents() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [forms, setForms] = useState([initialForm()]);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [examLoading, setExamLoading] = useState(false);
  const [examError, setExamError] = useState(null);

  /* ================= INITIAL FORM ================= */
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
      Status: "pending", // ✅ ALWAYS pending
      teacherId: 1,
    };
  }

  /* ================= FETCH EXAMS ================= */
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setExamLoading(true);
      setExamError(null);
      const res = await fetch("http://localhost:3000/api/v1/exam-schedule");
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch exams");

      // Filter only active exams
      const activeExams = data.data.filter((e) => e.status === "active");

      setExams(activeExams);
    } catch (err) {
      console.error(err);
      setExamError("Failed to load exams");
    } finally {
      setExamLoading(false);
    }
  };

  /* ================= ACTIONS ================= */
  const selectExam = (exam) => {
    setSelectedExam(exam);
    setForms([initialForm()]);
  };

  const handleChange = (index, e) => {
    const updated = [...forms];
    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
      Status: "pending", // 🔒 enforce pending
    };
    setForms(updated);
  };

  const addForm = () => setForms([...forms, initialForm()]);
  const removeForm = (index) => setForms(forms.filter((_, i) => i !== index));

  const totalAmount = selectedExam ? forms.length * selectedExam.amount : 0;

  /* ================= SUBMIT ================= */
  const handleSubmitAll = async () => {
    if (!selectedExam) {
      alert("Please select an exam");
      return;
    }

    for (let i = 0; i < forms.length; i++) {
      if (!forms[i].name || !forms[i].Class || !forms[i].phone) {
        alert(`Please fill required fields for Student ${i + 1}`);
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        examId: selectedExam.id,
        teacherId: 1,
        students: forms.map((s) => ({ ...s, Status: "pending" })),
      };

      const res = await fetch(
        "http://localhost:3000/api/v1/student/bulk",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to register students");
        return;
      }

      toast.success(`${data.meta.totalInserted} Registered Successfully`);
      setForms([initialForm()]);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-bold">
          Register Students – Hawking Maths Olympiad
        </h1>

        {/* ========== EXAM SELECTION ========== */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Select Exam</h2>

          {examLoading && (
            <div className="text-indigo-600 font-semibold py-2">
              Loading exams...
            </div>
          )}
          {examError && (
            <div className="text-red-500 font-semibold py-2">{examError}</div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => {
              const active = selectedExam?.id === exam.id;

              return (
                <div
                  key={exam.id}
                  onClick={() => selectExam(exam)}
                  className={`
                    relative cursor-pointer rounded-2xl border-2 p-5 shadow-md transition-all duration-300
                    transform hover:-translate-y-1 hover:shadow-xl
                    ${active ? "border-indigo-600 bg-gradient-to-r from-indigo-50 to-indigo-100" : "border-gray-200 bg-white hover:border-indigo-400"}
                  `}>
                    {/* Selected Badge */}
                    {active && (
                      <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-xs text-white font-semibold shadow">
                        <FontAwesomeIcon icon={faCheck} /> Selected
                      </span>
                    )}

                    {/* Exam Name */}
                    <h3 className="mb-3 text-lg font-bold text-gray-800">{exam.name}</h3>

                    {/* Fee */}
                    <p className="mt-2 text-sm font-medium text-indigo-600">
                      Fee: ₹{exam.amount}
                    </p>

                    {/* Hover hint */}
                    <p className="mt-1 text-xs text-gray-400">
                      Click to select this exam
                    </p>
                </div>

              );
            })}
          </div>
        </div>

        {/* ========== FORMS ========== */}
        {selectedExam && (
          <>
            <div className="mb-6 rounded-xl bg-indigo-600 p-4 text-white">
              <h3 className="text-lg font-semibold">{selectedExam.name}</h3>
              <p className="text-sm">
                Students: {forms.length} | Total Amount: ₹{totalAmount}
              </p>
            </div>

            {forms.map((form, index) => (
              <div
                key={index}
                className="mb-6 rounded-2xl bg-white p-6 shadow"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold">Student {index + 1}</h2>

                  <div className="flex gap-2">
                    <button
                      onClick={addForm}
                      className="rounded-full bg-green-500 px-2 py-1 text-white"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button> 
                    {forms.length > 1 && (
                      <button
                        onClick={() => removeForm(index)}
                        className="rounded-full bg-red-500 px-2 py-1 text-white"
                      >
                        <FontAwesomeIcon icon={faMinus} />
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
                  <SelectField
                    label="Class"
                    name="Class"
                    value={form.Class}
                    onChange={(e) => handleChange(index, e)}
                    options={[
                      "Class-4",
                      "Class-5",
                      "Class-6",
                      "Class-7",
                      "Class-8",
                      "Class-9",
                    ]}
                  />
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
                    type="date"
                    name="dob"
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

            <div className="flex justify-end">
              <button
                onClick={handleSubmitAll}
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-8 py-3 text-white shadow disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit All Students"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */
function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600">{label}</label>
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

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-sm text-gray-600">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-11 rounded-lg border px-3"
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
