import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import PaymentSummaryModal from "./PaymentSummaryModal";
import RazorpayCheckout from "./RazorpayCheckout";

export default function TeacherBulkUpload() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  // PAYMENT
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // EXAMS
  const [exams, setExams] = useState([]);
  const [examLoading, setExamLoading] = useState(false);
  const [examError, setExamError] = useState(null);

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.id;

  /* ================= FETCH EXAMS ================= */
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setExamLoading(true);
      const res = await fetch("http://localhost:3000/api/v1/exam-schedule");
      const data = await res.json();
      setExams(data.data.filter((e) => e.status === "active"));
    } catch {
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
      const workbook = XLSX.read(evt.target.result, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(sheet);

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
        Status: "pending",
      }));

      setStudents(formatted);
    };

    reader.readAsArrayBuffer(file);
  };

  /* ================= VALIDATE & OPEN PAYMENT ================= */
  const handleConfirmClick = () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    if (students.length === 0) {
      toast.error("No students uploaded");
      return;
    }

    setShowPaymentModal(true);
  };

  /* ================= AFTER PAYMENT SUCCESS ================= */
  const registerBulkStudents = async (payment) => {
    try {
      setLoading(true);

      const payload = {
        examId: selectedExam.id,
        teacherId,
        students: students.map((s) => ({
          ...s,
          examId: selectedExam.id,
          teacherId,
          Status: "paid",
          paymentId: payment.razorpay_payment_id,
        })),
      };

      const res = await fetch(
        "http://localhost:3000/api/v1/student/bulk",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Payment successful & students registered!");
      setStudents([]);
      setFileName("");
      setSelectedExam(null);
    } catch {
      toast.error("Payment done, but registration failed");
    } finally {
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold mb-2">Bulk Upload Students</h1>
        <p className="mb-6 text-gray-600">
          Select exam → upload Excel → pay → register students
        </p>

        {/* EXAMS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          {exams.map((exam) => {
            const active = selectedExam?.id === exam.id;
            return (
              <div
                key={exam.id}
                onClick={() => selectExam(exam)}
                className={`cursor-pointer rounded-2xl border-2 p-5 shadow transition
                  ${active
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-400"}
                `}
              >
                {active && (
                  <span className="absolute right-4 top-4 text-xs bg-indigo-600 text-white px-3 py-1 rounded-full">
                    <FontAwesomeIcon icon={faCheck} /> Selected
                  </span>
                )}
                <h3 className="font-bold text-lg">{exam.name}</h3>
                <p className="text-indigo-600 mt-2">Fee: ₹{exam.amount}</p>
              </div>
            );
          })}
        </div>

        {/* UPLOAD */}
        {selectedExam && (
          <div className="bg-white rounded-2xl p-6 shadow mb-6 w-[90%]">
            <p className="text-green-600 mb-3">
              Selected Exam: <strong>{selectedExam.name}</strong>
            </p>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 rounded-xl p-8 cursor-pointer hover:bg-indigo-50">
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <p className="text-indigo-600 font-medium">
                Click to upload Excel file
              </p>
              {fileName && (
                <p className="mt-2 text-sm text-gray-600">{fileName}</p>
              )}
            </label>
          </div>
        )}

        {/* PREVIEW */}
        {students.length > 0 && (
          <div className="bg-white rounded-2xl shadow w-[90%] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(students[0]).map((k) => (
                      <th key={k} className="px-4 py-3 text-left font-semibold">
                        {k}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map((row, i) => (
                    <tr key={i} className={i % 2 ? "bg-gray-50" : ""}>
                      {Object.values(row).map((v, idx) => (
                        <td key={idx} className="px-4 py-2">
                          {v || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center p-4 border-t">
              <p>Total Students: <strong>{students.length}</strong></p>
              <button
                onClick={handleConfirmClick}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        )}

        {/* PAYMENT MODAL */}
        <PaymentSummaryModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          exam={selectedExam}
          studentCount={students.length}
          onProceed={({ amount }) => {
            RazorpayCheckout({
              amount,
              examName: selectedExam.name,
              onSuccess: registerBulkStudents,
            });
          }}
        />
      </div>
    </div>
  );
}
