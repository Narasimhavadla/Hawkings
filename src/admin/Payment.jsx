import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSchool,
  faBook,
  faUsers,
  faMoneyBill,
  faCalendar,
  faCheckCircle,
  faTimesCircle,
  faClock
} from "@fortawesome/free-solid-svg-icons";

export default function Payment() {
  const [payments] = useState([
    {
      teacher: "Teacher A",
      school: "ABC High School",
      exam: "Hawking Maths Olympiad – Level 1",
      students: 25,
      amount: 5000,
      method: "Razorpay",
      date: "2026-01-20",
      status: "Success",
    },
    {
      teacher: "Teacher B",
      school: "XYZ Public School",
      exam: "Hawking Maths Olympiad – Level 2",
      students: 15,
      amount: 3000,
      method: "UPI",
      date: "2026-01-22",
      status: "Pending",
    },
    {
      teacher: "Teacher C",
      school: "Global School",
      exam: "Hawking Maths Olympiad – Level 1",
      students: 40,
      amount: 8000,
      method: "Card",
      date: "2026-01-24",
      status: "Failed",
    },
  ]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchesSearch =
        p.teacher.toLowerCase().includes(search.toLowerCase()) ||
        p.school.toLowerCase().includes(search.toLowerCase()) ||
        p.exam.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter ? p.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const statusBadge = (status) => {
    if (status === "Success")
      return "bg-green-100 text-green-700";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const statusIcon = (status) => {
    if (status === "Success") return faCheckCircle;
    if (status === "Pending") return faClock;
    return faTimesCircle;
  };

  const totalRevenue = filteredPayments
    .filter(p => p.status === "Success")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-2 text-2xl font-bold">Payments Dashboard</h1>
        <p className="mb-6 text-gray-600">
          Track teacher payments, exams, students count, and payment status
        </p>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Total Payments</p>
            <p className="text-2xl font-bold">{filteredPayments.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Successful Revenue</p>
            <p className="text-2xl font-bold text-green-600">₹{totalRevenue}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm text-gray-500">Pending / Failed</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredPayments.filter(p => p.status !== "Success").length}
            </p>
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search by teacher, school, exam..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 md:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {/* ===== PAYMENTS TABLE ===== */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Teacher</th>
                  <th className="px-4 py-3 text-left">School</th>
                  <th className="px-4 py-3 text-left">Exam</th>
                  <th className="px-4 py-3 text-left">Students</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">
                      <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
                      {p.teacher}
                    </td>
                    <td className="px-4 py-2">
                      <FontAwesomeIcon icon={faSchool} className="mr-2 text-gray-400" />
                      {p.school}
                    </td>
                    <td className="px-4 py-2">
                      <FontAwesomeIcon icon={faBook} className="mr-2 text-gray-400" />
                      {p.exam}
                    </td>
                    <td className="px-4 py-2">
                      <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-400" />
                      {p.students}
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      <FontAwesomeIcon icon={faMoneyBill} className="mr-2 text-gray-400" />
                      ₹{p.amount}
                    </td>
                    <td className="px-4 py-2">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2 text-gray-400" />
                      {p.date}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(p.status)}`}>
                        <FontAwesomeIcon icon={statusIcon(p.status)} />
                        {p.status}
                      </span>
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
