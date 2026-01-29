import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

export default function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/referrals/admin"
      );
      setReferrals(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return referrals.filter((r) => {
      const search =
        r.referrerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.referredName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.referralCode?.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = filterStatus ? r.status === filterStatus : true;
      return search && statusMatch;
    });
  }, [referrals, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const start = (currentPage - 1) * recordsPerPage;
  const currentRecords = filteredData.slice(start, start + recordsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Referrals");
    XLSX.writeFile(wb, "referrals.xlsx");
  };

  const statusBadge = (status) => {
    if (status === "Used")
      return "bg-green-100 text-green-700 border border-green-300";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    return "bg-gray-100 text-gray-700 border border-gray-300";
  };

  if (loading)
    return (
      <div className="p-8 text-center text-gray-600">
        Loading referrals...
      </div>
    );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Referral Dashboard</h1>
        <p className="text-sm opacity-90">
          Track teacher referrals & cashback status
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-5 flex flex-col md:flex-row md:items-center gap-3">
        <input
          placeholder="Search by name or code..."
          className="border rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2 w-full md:w-40"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Used">Used</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          onClick={exportToExcel}
          className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faFileExcel} />
          Export
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              {/* <th className="px-4 py-3">Referral Count</th> */}
              <th className="px-4 py-3 text-left">Referrer</th>
              <th className="px-4 py-3 text-left">Referred</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Used At</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Cashback</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500"
                >
                  No referrals found
                </td>
              </tr>
            )}

            {currentRecords.map((r, i) => (
              <tr
                key={i}
                className="border-t hover:bg-indigo-50 transition"
              >
                {/* <td className="px-4 py-3 font-semibold text-indigo-600">
                    {r.referralCount}
                </td> */}

                <td className="px-4 py-3 font-medium">
                  {r.referrerName || "-"}
                </td>
                <td className="px-4 py-3">
                  {r.referredName || "-"}
                </td>
                <td className="px-4 py-3 font-mono text-indigo-600">
                  {r.referralCode}
                </td>
                <td className="px-4 py-3">
                  {r.usedAt
                    ? new Date(r.usedAt).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-3">
                  ₹{r.paymentAmount || 0}
                </td>
                <td className="px-4 py-3 text-green-600 font-semibold">
                  ₹{r.cashbackAmount || 0}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <span className="text-sm text-gray-600">
            Page <b>{currentPage}</b> of <b>{totalPages || 1}</b>
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
