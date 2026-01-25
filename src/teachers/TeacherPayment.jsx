import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faDownload } from "@fortawesome/free-solid-svg-icons";

export default function TeacherPayments() {
  const [payments] = useState([
    {
      id: 1,
      examName: "Hawking Maths Olympiad – Level 1",
      studentsCount: 120,
      amount: 6000,
      paymentDate: "2025-01-12",
      invoiceNo: "INV-HMO-001",
    },
    {
      id: 2,
      examName: "Hawking Maths Olympiad – Level 2",
      studentsCount: 80,
      amount: 4800,
      paymentDate: "2025-02-03",
      invoiceNo: "INV-HMO-002",
    },
    {
      id: 3,
      examName: "Hawking Junior Maths Challenge",
      studentsCount: 45,
      amount: 2250,
      paymentDate: "2025-03-01",
      invoiceNo: "INV-HMO-003",
    },
  ]);

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalStudents = payments.reduce((sum, p) => sum + p.studentsCount, 0);

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
          <SummaryCard
            title="Total Amount"
            value={`₹ ${totalAmount}`}
          />
          <SummaryCard
            title="Total Students"
            value={totalStudents}
          />
          <SummaryCard
            title="Exams Paid"
            value={payments.length}
          />
        </div>

        {/* Payments Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b px-6 py-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faFileInvoice} className="text-indigo-600" />
            <h2 className="text-lg font-semibold">Payment History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Exam Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Students
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
                {payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3">{payment.examName}</td>
                    <td className="px-4 py-3">{payment.studentsCount}</td>
                    <td className="px-4 py-3 font-medium">
                      ₹ {payment.amount}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-indigo-600 hover:bg-indigo-50"
                        onClick={() =>
                          alert(`Downloading ${payment.invoiceNo}`)
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
