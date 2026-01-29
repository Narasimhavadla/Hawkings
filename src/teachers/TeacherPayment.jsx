import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faDownload } from "@fortawesome/free-solid-svg-icons";

const API_BASE = "http://localhost:3000/api/v1";

export default function TeacherPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👉 Replace this with real teacherId from auth
  // const teacherId = localStorage.getItem("teacherId"); 

   const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.teacherId;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/teacher-payments/${teacherId}`
      );
      setPayments(res.data.data || []);
    } catch (err) {
      console.error("Failed to load payments", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = (invoiceNo) => {
    window.open(
      `${API_BASE}/invoices/${invoiceNo}`,
      "_blank"
    );
  };

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalStudents = payments.reduce(
    (sum, p) => sum + (p.studentsCount || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading payments...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Teacher Payments</h1>
          <p className="text-gray-600">
            Track your exam payments and download invoices
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SummaryCard title="Total Amount" value={`₹ ${totalAmount}`} />
          {/* <SummaryCard title="Total Students" value={totalStudents} /> */}
          <SummaryCard title="Exams Paid" value={payments.length} />
        </div>

        {/* Payments Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="flex items-center gap-2 border-b px-6 py-4">
            <FontAwesomeIcon
              icon={faFileInvoice}
              className="text-indigo-600"
            />
            <h2 className="text-lg font-semibold">
              Payment History
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Exam Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Payment Date
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">
                    Invoice
                  </th>
                </tr>
              </thead>

              <tbody>
                {payments.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No payments found
                    </td>
                  </tr>
                )}

                {payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }
                  >
                    <td className="px-4 py-3">
                      Teacher Registration Fee
                    </td>
                    <td className="px-4 py-3 font-medium">
                      ₹ {payment.amount}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-indigo-600 hover:bg-indigo-50"
                        onClick={() =>
                          downloadInvoice(payment.invoiceNo)
                        }
                      >
                        <FontAwesomeIcon icon={faDownload} />
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
