import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
//   faUser, faCalendar, faMoneyBill, faGift,
   faChevronLeft, faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

export default function Referrals() {
  const [referrals] = useState([
    { id:1, referrer: "Teacher A", referred: "Teacher B", referralCode: "REF123", dateUsed: "2026-01-20", paymentByReferred: 5000, cashbackReceived: 500, status: "Used" },
    { id:2, referrer: "Teacher C", referred: "Teacher D", referralCode: "REF456", dateUsed: "2026-01-22", paymentByReferred: 3000, cashbackReceived: 300, status: "Used" },
    { id:3, referrer: "Teacher E", referred: "Teacher F", referralCode: "REF789", dateUsed: "2026-01-23", paymentByReferred: 7000, cashbackReceived: 700, status: "Pending" },
    { id:4, referrer: "Teacher G", referred: "Teacher H", referralCode: "REF101", dateUsed: "2026-01-24", paymentByReferred: 4500, cashbackReceived: 450, status: "Used" },
    { id:5, referrer: "Teacher I", referred: "Teacher J", referralCode: "REF102", dateUsed: "2026-01-25", paymentByReferred: 6000, cashbackReceived: 600, status: "Unused" },
    { id:6, referrer: "Teacher K", referred: "Teacher L", referralCode: "REF103", dateUsed: "2026-01-26", paymentByReferred: 3500, cashbackReceived: 350, status: "Used" },
    { id:7, referrer: "Teacher M", referred: "Teacher N", referralCode: "REF104", dateUsed: "2026-01-27", paymentByReferred: 8000, cashbackReceived: 800, status: "Used" },
    { id:8, referrer: "Teacher O", referred: "Teacher P", referralCode: "REF105", dateUsed: "2026-01-28", paymentByReferred: 5500, cashbackReceived: 550, status: "Pending" },
    { id:9, referrer: "Teacher Q", referred: "Teacher R", referralCode: "REF106", dateUsed: "2026-01-29", paymentByReferred: 4000, cashbackReceived: 400, status: "Used" },
    { id:10, referrer: "Teacher S", referred: "Teacher T", referralCode: "REF107", dateUsed: "2026-01-30", paymentByReferred: 7500, cashbackReceived: 750, status: "Used" },
    { id:11, referrer: "Teacher U", referred: "Teacher V", referralCode: "REF108", dateUsed: "2026-01-31", paymentByReferred: 5000, cashbackReceived: 500, status: "Unused" },
  ]);

  // ---------------- PAGINATION ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // ---------------- SEARCH & FILTER ----------------
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredData = useMemo(() => {
    return referrals.filter((r) => {
      const matchesSearch = 
        r.referrer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.referred.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus ? r.status === filterStatus : true;
      return matchesSearch && matchesStatus;
    });
  }, [referrals, searchTerm, filterStatus]);

  // ---------------- SORTING ----------------
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a,b) => {
      if(a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if(a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = sortedData.slice(indexOfFirst, indexOfLast);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // ---------------- EXPORT ----------------
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Referrals");
    XLSX.writeFile(wb, "referrals.xlsx");
  };

  // ---------------- STATUS COLORS ----------------
  const statusColor = (status) => {
    if(status === "Used") return "text-green-800";
    if(status === "Pending") return " text-yellow-800";
    if(status === "Unused") return " text-gray-800";
    return " text-gray-800";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold">Referral Dashboard</h1>

        {/* SEARCH & FILTER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <input 
            type="text" 
            placeholder="Search by referrer, referred, code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg border px-3 py-1 w-full md:w-1/2"
          />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border px-3 py-1 w-full md:w-1/4"
          >
            <option value="">All Status</option>
            <option value="Used">Used</option>
            <option value="Pending">Pending</option>
            <option value="Unused">Unused</option>
          </select>
          <button 
            onClick={exportToExcel} 
            className="bg-indigo-600 text-white px-4 py-1 rounded-lg shadow"
          >
            Export Excel
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th onClick={() => requestSort("referrer")} className="cursor-pointer border-b px-4 py-3 font-semibold text-gray-600">Referrer</th>
                  <th onClick={() => requestSort("referred")} className="cursor-pointer border-b px-4 py-3 font-semibold text-gray-600">Referred</th>
                  <th onClick={() => requestSort("referralCode")} className="cursor-pointer border-b px-4 py-3 font-semibold text-gray-600 ">Referral Code</th>
                  <th onClick={() => requestSort("dateUsed")} className="cursor-pointer border-b px-4 py-3 font-semibold text-gray-600">Date Used</th>
                  <th onClick={() => requestSort("paymentByReferred")} className="cursor-pointer border-b px-4 py-3 font-semibold text-gray-600">Payment Made</th>
                  <th onClick={() => requestSort("cashbackReceived")} className="cursor-pointer border-b px-4 py-3 font-semibold text-gray-600">Cashback</th>
                  <th className="border-b px-4 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item,i) => (
                  <tr key={i} className={i%2===0?"bg-white":"bg-gray-50"}>
                    <td className="border-b px-4 py-2">{item.referrer}</td>
                    <td className="border-b px-4 py-2">{item.referred}</td>
                    <td className="border-b px-4 py-2 font-mono text-indigo-800 font-semibold"><span className="bg-indigo-200 px-2 rounded">{item.referralCode}</span></td>
                    <td className="border-b px-4 py-2">{item.dateUsed}</td>
                    <td className="border-b px-4 py-2">₹{item.paymentByReferred}</td>
                    <td className="border-b px-4 py-2 text-green-600 font-semibold">₹{item.cashbackReceived}</td>
                    <td className={`border-b px-4 py-2 font-semibold ${statusColor(item.status)} text-center rounded-full`}>
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center border-t p-4">
            <p className="text-sm text-gray-600">
              Showing {indexOfFirst + 1}-{Math.min(indexOfLast, sortedData.length)} of {sortedData.length} referrals
            </p>
            <div className="flex gap-2">
              <button onClick={prevPage} disabled={currentPage===1} className="flex items-center gap-1 rounded-lg border px-3 py-1 disabled:opacity-50">
                <FontAwesomeIcon icon={faChevronLeft} /> Prev
              </button>
              <button onClick={nextPage} disabled={currentPage===totalPages} className="flex items-center gap-1 rounded-lg border px-3 py-1 disabled:opacity-50">
                Next <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
