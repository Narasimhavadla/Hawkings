

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faUsers,
  faGift,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function TeacherReffer() {
  const referralCode = "HAWKING-TCH-4821";

  const [referrals] = useState([
    {
      id: 1,
      teacherName: "Ramesh Kumar",
      examName: "Hawking Maths Olympiad – Level 1",
      paymentAmount: 3000,
      cashback: 300,
      status: "Credited",
      date: "2025-02-10",
    },
    {
      id: 2,
      teacherName: "Sita Devi",
      examName: "Hawking Junior Maths Challenge",
      paymentAmount: 2000,
      cashback: 200,
      status: "Pending",
      date: "2025-02-18",
    },
  ]);

  const totalEarnings = referrals.reduce(
    (sum, r) => sum + (r.status === "Credited" ? r.cashback : 0),
    0
  );

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    alert("Referral code copied!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Refer & Earn</h1>
          <p className="text-gray-600">
            Share your referral code and earn cashback on first payment
          </p>
        </div>

        {/* Referral Code Card */}
        <div className="mb-6 rounded-2xl bg-indigo-600 p-6 text-white shadow">
          <p className="text-sm opacity-90">Your Referral Code</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="text-2xl font-bold tracking-wider">
              {referralCode}
            </span>
            <button
              onClick={copyCode}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-indigo-600 shadow hover:bg-indigo-50"
            >
              <FontAwesomeIcon icon={faCopy} />
              Copy
            </button>
          </div>
          <p className="mt-3 text-sm opacity-90">
            🎁 Earn <strong>10% cashback</strong> on every teacher’s first
            payment using your code
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <SummaryCard
            icon={faUsers}
            title="Total Referrals"
            value={referrals.length}
          />
          <SummaryCard
            icon={faGift}
            title="Cashback Earned"
            value={`₹ ${totalEarnings}`}
          />
          {/* <SummaryCard
            icon={faWallet}
            title="Wallet Balance"
            value={`₹ ${totalEarnings}`}
          /> */}
        </div>

        {/* Referral History Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Referral History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Teacher
                  </th>
                  {/* <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Exam
                  </th> */}
                  {/* <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Payment
                  </th> */}
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Cashback
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {referrals.map((ref, index) => (
                  <tr
                    key={ref.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3">{ref.teacherName}</td>
                    {/* <td className="px-4 py-3">{ref.examName}</td> */}
                    {/* <td className="px-4 py-3">₹ {ref.paymentAmount}</td> */}
                    <td className="px-4 py-3 font-medium">
                      ₹ {ref.cashback}
                    </td>
                    <td className="px-4 py-3">
                      {ref.status === "Credited" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                          <FontAwesomeIcon icon={faCheckCircle} />
                          Credited
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(ref.date).toLocaleDateString()}
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

function SummaryCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
          <FontAwesomeIcon icon={icon} />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
