import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function TeacherBulkUpload() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const [exams, setExams] = useState([]);
  const [examLoading, setExamLoading] = useState(false);
  const [examError, setExamError] = useState(null);

  const teacherId = 1; // 🔒 default teacher

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

  /* ================= SELECT EXAM ================= */
  const selectExam = (exam) => {
    setSelectedExam(exam);
    setStudents([]);
    setFileName("");
  };

  /* ================= FILE UPLOAD ================= */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(sheet);

      // 🔒 Normalize & enforce backend rules
      const formatted = raw.map((row) => ({
        Class: row.Class || "",
        name: row.name || "",
        fathername: row.fathername || "",
        email: row.email || "",
        phone: row.phone || "",
        altphone: row.altphone || "",
        dob: row.dob || "",
        institute: row.institute || "",
        state: row.state || "",
        city: row.city || "",
        pincode: row.pincode || "",
        Status: "pending", // ✅ forced
      }));

      setStudents(formatted);
    };

    reader.readAsArrayBuffer(file);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    if (students.length === 0) {
      toast.error("No students to submit");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        examId: selectedExam.id,
        teacherId,
        students,
      };

      const res = await fetch(
        "http://localhost:3000/api/v1/student/bulk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Bulk upload failed");
        return;
      }

      toast.success(
        `${data.meta.totalInserted} students registered successfully`
      );

      setStudents([]);
      setFileName("");
    } catch (err) {
      console.error(err);
      toast.error("Server error while uploading students");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-2xl font-bold">Bulk Upload Students</h1>
        <p className="mb-6 text-gray-600">
          Select an exam first, then upload an Excel file to preview and verify student details.
        </p>

        {/* ================= EXAM CARDS ================= */}
        {examLoading && (
          <div className="text-indigo-600 font-semibold py-2">
            Loading exams...
          </div>
        )}
        {examError && (
          <div className="text-red-500 font-semibold py-2">{examError}</div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                `}
              >
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
                    Fee: ₹{exam.amount || "N/A"}
                  </p>

                  {/* Hover Effect Hint */}
                  <p className="mt-1 text-xs text-gray-400">
                    Click to select this exam
                  </p>
            </div>

            );
          })}
        </div>

        {/* ================= UPLOAD ================= */}
        {selectedExam && (
          <div className="mb-6 rounded-2xl bg-white p-6 shadow">
            <p className="mb-4 text-sm text-green-600">
              Selected Exam: <strong>{selectedExam.name}</strong>
            </p>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-300 p-8 text-center hover:bg-indigo-50">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-lg font-medium text-indigo-600">
                Click to upload Excel file
              </p>
              <p className="text-sm text-gray-500">(.xlsx or .xls)</p>
              {fileName && (
                <p className="mt-2 text-sm text-gray-700">File: {fileName}</p>
              )}
            </label>
          </div>
        )}

        {/* ================= PREVIEW ================= */}
        {students.length > 0 && (
          <div className="overflow-hidden rounded-2xl bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(students[0]).map((key) => (
                      <th
                        key={key}
                        className="border-b px-4 py-3 text-left font-semibold text-gray-600"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((row, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {Object.values(row).map((val, idx) => (
                        <td key={idx} className="border-b px-4 py-2">
                          {val || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t p-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-600">
                Total Students: <strong>{students.length}</strong>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setStudents([])}
                  className="rounded-xl border px-5 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-white shadow disabled:opacity-60"
                >
                  {loading ? "Uploading..." : "Confirm & Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
