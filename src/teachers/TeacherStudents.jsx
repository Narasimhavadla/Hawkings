import { useEffect, useState } from "react";
import ExamCard from "./components/ExamCard";
import StudentFormCard from "./components/StudentFormCard";
import PaymentSummaryModal from "./PaymentSummaryModal";
import RazorpayCheckout from "./RazorpayCheckout";
import { toast } from "react-toastify";

/* ================= EMPTY STUDENT ================= */
const emptyStudent = () => ({
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
});

export default function TeacherStudents() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [students, setStudents] = useState([emptyStudent()]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // const teacherId = JSON.parse(localStorage.getItem("authUser"))?.id;
    const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.id;

  /* ================= FETCH EXAMS ================= */
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/exam-schedule")
      .then((res) => res.json())
      .then((data) => {
        const active = data.data?.filter((e) => e.status === "active") || [];
        setExams(active);
      })
      .catch(() => toast.error("Failed to load exams"));
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (index, e) => {
    const updated = [...students];
    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };
    setStudents(updated);
  };

  const totalAmount =
    selectedExam?.amount ? students.length * selectedExam.amount : 0;

  /* ================= VALIDATION ================= */
  const handleSubmitClick = () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    for (let i = 0; i < students.length; i++) {
      const s = students[i];
      const required = [
        "Class",
        "name",
        "fathername",
        "email",
        "phone",
        "dob",
        "institute",
        "state",
        "city",
        "pincode",
      ];

      for (let field of required) {
        if (!s[field]) {
          toast.error(`Fill ${field} for Student ${i + 1}`);
          return;
        }
      }
    }

    setShowPaymentModal(true);
  };

  /* ================= REGISTER STUDENTS AFTER PAYMENT ================= */
  const registerStudents = async (paymentData) => {
    try {
      setLoading(true);

      const payload = {
        examId: selectedExam.id,
        teacherId,
        paymentId: paymentData.paymentId,
        students: students.map((s) => ({
          ...s,
          Status: "paid",
        })),
      };

      const res = await fetch("http://localhost:3000/api/v1/student/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success("Payment successful & students registered!");
      setStudents([emptyStudent()]);
      setSelectedExam(null);
    } catch {
      toast.error("Payment done, but student registration failed");
    } finally {
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Register Students – Maths Olympiad
      </h1>

      {/* ================= EXAMS ================= */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            selected={selectedExam?.id === exam.id}
            onSelect={(e) => {
              setSelectedExam(e);
              setStudents([emptyStudent()]);
            }}
          />
        ))}
      </div>

      {/* ================= STUDENTS ================= */}
      {selectedExam && (
        <>
          <div className="bg-indigo-600 text-white rounded-xl p-4 mb-6">
            <h3 className="font-semibold">{selectedExam.name}</h3>
            <p>
              Students: {students.length} | Total: ₹{totalAmount}
            </p>
          </div>

          {students.map((s, i) => (
            <StudentFormCard
              key={i}
              index={i}
              data={s}
              onChange={(e) => handleChange(i, e)}
              onAdd={() => setStudents([...students, emptyStudent()])}
              onRemove={() =>
                setStudents(students.filter((_, idx) => idx !== i))
              }
              canRemove={students.length > 1}
            />
          ))}

          <div className="flex justify-end">
            <button
              onClick={handleSubmitClick}
              disabled={loading}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl"
            >
              {loading ? "Processing..." : "Submit & Pay"}
            </button>
          </div>
        </>
      )}

      {/* ================= PAYMENT MODAL ================= */}
      {selectedExam && (
        <PaymentSummaryModal
          open={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          exam={selectedExam}
          studentCount={students.length}
          onProceed={({ amount, discountApplied }) =>
            RazorpayCheckout({
              amount,
              examName: selectedExam.name,
              teacherId,
              examId: selectedExam.id,
              discountApplied,
              onSuccess: registerStudents,
            })
          }
        />
      )}
    </div>
  );
}
