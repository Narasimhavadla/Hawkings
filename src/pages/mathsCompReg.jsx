import { useState } from "react";
import axios from "axios";

import StudentForm from "../forms/StudentForm";
import TeacherRegistration from "../forms/TeacherRegistration";
import LoadingModal from "../utils/LoadingModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle
} from "@fortawesome/free-solid-svg-icons";

function MathsCompReg() {
  const [activeForm, setActiveForm] = useState("student"); // student | teacher
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const [step, setStep] = useState(1); // 1 = form, 2 = payment, 3 = success
  const [studentPayload, setStudentPayload] = useState(null);

  const handleSubmitStudent = async (studentData) => {
    setStudentPayload({
      ...studentData,
      Status: "pending",
      examId: 0,
      teacherId: 0,
    });
    setStep(2); 
  };

  const handleSubmitTeacher = async (teacherData) => {
    try {
      setLoading(true);
      setSuccessMessage("");

      const payload = {
        name: teacherData.name,
        school: teacherData.school,
        qualification: teacherData.qualification,
        phone: teacherData.phone,
        teachingType: teacherData.teachingType,
        email: teacherData.email,
        upiId: teacherData.upiId,
        teachingFrom: teacherData.teachingFrom,
        teachingTo: teacherData.teachingTo,
        role: "teacher",
        refferCode :teacherData.refferCode
      };

      await axios.post(
        "http://localhost:3000/api/v1/teachers",
        payload
      );

      setSuccessMessage(
        "Teacher registered successfully! Please check your email for login credentials."
      );
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Failed to register teacher. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- STEP INDICATOR ---------------- */
  function StepIndicator({ step }) {
    const steps = ["Fill Details", "Payment", "Success"];

    return (
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div key={label} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold
                    ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {stepNumber}
                </div>

                <span className="ml-3 font-medium text-sm md:text-base">
                  {label}
                </span>

                {index !== steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-4">
                    <div
                      className={`h-1 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------------- STEP 2 PAYMENT ---------------- */
  function StudentPayment({ onSuccess }) {
    const handlePayment = async () => {
      try {
        setLoading(true);

          const res = await fetch("http://localhost:3000/api/v1/student/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount : 1 }),
        });

        const order = await res.json();
        if (!order.success) return alert("Order creation failed");
            

        const options = {
          key: "rzp_test_S8sJNP1bvQjOn8", 
          amount: order.amount,
          currency: "INR",
          name: "Hawkings Maths Olympiad",
          description: "₹1 Test Payment",
          order_id: order.id,
          handler: async function (response) {
            // Verify payment in backend
            // const verifyRes = await axios.post(
            //   "http://localhost:3000/api/v1/student/verify-payment",
            //   {
            //     razorpay_order_id: response.razorpay_order_id,
            //     razorpay_payment_id: response.razorpay_payment_id,
            //     razorpay_signature: response.razorpay_signature,
            //     amount: 1,
            //     studentData: studentPayload,
            //   }
            // );

              const verifyRes = await fetch("http://localhost:3000/api/v1/student/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount :1,
              studentData: studentPayload,
            }),
          });

            if (verifyRes.data.success) {
              // Save student to DB after payment
              // await axios.post(
              //   "http://localhost:3000/api/v1/student",
              //   studentPayload
              // );

              onSuccess();
            } else {
              alert("❌ Payment verification failed");
            }
          },
          prefill: {
            name: studentPayload?.name || "Test Student",
            email: studentPayload?.email || "test@student.com",
            contact: studentPayload?.phone || "9999999999",
          },
          theme: { color: "#4f46e5" },
          modal: {
            ondismiss: () => {
              alert("Payment popup closed");
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Payment error:", err);
        alert("Something went wrong with payment");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">
          Registration Fee
        </h2>
        <p className="text-gray-600 mb-6">
          Pay ₹1 to complete registration
        </p>

        <button
          onClick={handlePayment}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Pay & Continue
        </button>
      </div>
    );
  }

  /* ---------------- STEP 3 SUCCESS ---------------- */
  function SuccessCard({ studentName, amountPaid = 1 }) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-8 text-center mt-8">
        <div className="flex justify-center mb-6">
          {/* <CheckCircleIcon className="w-20 h-20 text-green-500" /> */}
          <FontAwesomeIcon  icon={faCircle}/>
        </div>

        <h2 className="text-3xl font-extrabold text-green-600 mb-4">
          Registration Successful!
        </h2>
 
        <p className="text-gray-600 text-lg mb-6">
          {studentName
            ? `${studentName} has been successfully registered.`
            : "Your student registration has been completed successfully."}
        </p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <p className="text-green-700 font-semibold">
            Payment Received: ₹{amountPaid}
          </p>
          <p className="text-green-600 text-sm">
            Transaction completed successfully.
          </p>
        </div>

        <div className="text-gray-700 text-left">
          <p className="mb-2 font-semibold">Next Steps:</p>
          <ul className="list-disc list-inside">
            <li>Check your email for login credentials.</li>
            <li>Prepare for the upcoming maths competition.</li>
            <li>Contact support if you have any questions.</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all"
        >
          Done
        </button>
      </div>
    );
  }

  /* ---------------- RENDER ---------------- */
  return (
    <>
      {/* 🔒 LOADING MODAL */}
      <LoadingModal
        show={loading}
        message={
          activeForm === "teacher"
            ? "Registering teacher & sending email. Please wait..."
            : step === 2
            ? "Processing payment..."
            : "Registering student. Please wait..."
        }
      />

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

        {/* Toggle */}
        <div className="max-w-md mx-auto mb-4">
          <div className="flex bg-white rounded-xl shadow-md ">
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

        {/* Forms / Steps */}
        <div className="max-w-5xl mx-auto">
          {activeForm === "student" && (
            <>
              <StepIndicator step={step} />

              {step === 1 && (
                <StudentForm
                  onSubmit={handleSubmitStudent}
                  loading={loading} 
                />
              )}

              {step === 2 && (
                <StudentPayment
                  onSuccess={() => setStep(3)}
                  studentData = {studentPayload}

                />
              )}

              {step === 3 && (
                <SuccessCard
                  studentName={studentPayload?.name}
                  amountPaid={1}
                />
              )}
            </>
          )}

          {activeForm === "teacher" && (
            <TeacherRegistration
              onSubmit={handleSubmitTeacher}
              loading={loading}
              successMessage={successMessage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default MathsCompReg;

/* ---------- Toggle Button ---------- */
function ToggleButton({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-1/2 py-2 text-sm md:text-base font-semibold rounded-lg transition-all
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
