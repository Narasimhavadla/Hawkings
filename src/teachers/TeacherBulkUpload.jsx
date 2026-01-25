import { useState } from "react";
import * as XLSX from "xlsx";

export default function TeacherBulkUpload() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");

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

  const selectExam = (exam) => {
    setSelectedExam(exam);
    setStudents([]);
    setFileName("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);
      setStudents(json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-2xl font-bold">Bulk Upload Students</h1>
        <p className="mb-6 text-gray-600">
          Select an exam first, then upload an Excel file to preview and verify student details.
        </p>

        {/* ================= EXAM CARDS ================= */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exams.map((exam) => {
            const active = selectedExam?.id === exam.id;
            return (
              <div
                key={exam.id}
                onClick={() => selectExam(exam)}
                className={`cursor-pointer rounded-2xl border p-5 shadow transition
                  ${active ? "border-indigo-600 bg-indigo-50" : "bg-white hover:border-indigo-400"}
                `}
              >
                <h3 className="mb-2 text-lg font-semibold">{exam.name}</h3>
                <p className="text-sm text-gray-600">Eligible: {exam.classes}</p>
                <p className="mt-2 text-sm font-medium text-indigo-600">Fee: {exam.fee}</p>
                {active && (
                  <span className="mt-3 inline-block rounded-full bg-indigo-600 px-4 py-1 text-xs text-white">
                    Selected
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= UPLOAD CARD ================= */}
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

        {/* ================= TABLE PREVIEW ================= */}
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
                          {val ?? "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-3 border-t p-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-600">
                Total Students: <strong>{students.length}</strong>
              </p>
              <div className="flex gap-3">
                <button className="rounded-xl border px-5 py-2">Cancel</button>
                <button className="rounded-xl bg-indigo-600 px-5 py-2 text-white shadow">
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
