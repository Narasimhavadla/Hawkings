import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";

const ITEMS_PER_PAGE = 10;

const UserActivities = () => {
  const [activities, setActivities] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");
  const [activeOnly, setActiveOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* ----------------------------------
     Load activity records (API)
  -----------------------------------*/
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:3000/api/v1/activity/user-activities",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const json = await res.json();

        if (json.status) {
          // Recent first
          const sorted = json.data.sort(
            (a, b) => new Date(b.loginTime) - new Date(a.loginTime)
          );
          setActivities(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch activities", err);
      }
    };

    fetchActivities();
  }, []);

  /* ----------------------------------
     Time spent
  -----------------------------------*/
  const calculateDuration = (login, logout) => {
    if (!login) return "-";
    if (!logout) return "Active";

    const diff = new Date(logout) - new Date(login);
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}h ${m}m`;
  };

  /* ----------------------------------
     Date helper
  -----------------------------------*/
  const isSameDay = (d1, d2) =>
    d1.toDateString() === d2.toDateString();

  /* ----------------------------------
     Filtered Data
  -----------------------------------*/
  const filteredData = useMemo(() => {
    let data = [...activities];

    // Role filter
    if (roleFilter !== "all") {
      data = data.filter((i) => i.role === roleFilter);
    }

    // ✅ Active filter
    if (activeOnly) {
      data = data.filter((i) => !i.logoutTime);
    }

    const today = new Date();

    // Quick filters
    if (quickFilter === "today") {
      data = data.filter((i) =>
        isSameDay(new Date(i.loginTime), today)
      );
    }

    if (quickFilter === "yesterday") {
      const y = new Date();
      y.setDate(today.getDate() - 1);
      data = data.filter((i) =>
        isSameDay(new Date(i.loginTime), y)
      );
    }

    if (quickFilter === "last2days") {
      const d = new Date();
      d.setDate(today.getDate() - 2);
      data = data.filter(
        (i) => new Date(i.loginTime) >= d
      );
    }

    // Date picker
    if (dateFilter) {
      data = data.filter((i) =>
        isSameDay(
          new Date(i.loginTime),
          new Date(dateFilter)
        )
      );
    }

    return data;
  }, [
    activities,
    roleFilter,
    dateFilter,
    quickFilter,
    activeOnly,
  ]);

  /* ----------------------------------
     Pagination
  -----------------------------------*/
  const totalPages = Math.ceil(
    filteredData.length / ITEMS_PER_PAGE
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  /* ----------------------------------
     Export Excel
  -----------------------------------*/
  const exportToExcel = () => {
    const excelData = filteredData.map((item, index) => ({
      "S.No": index + 1,
      Username: item.username,
      Role: item.role,
      "Login Time": new Date(item.loginTime).toLocaleString(),
      "Logout Time": item.logoutTime
        ? new Date(item.logoutTime).toLocaleString()
        : "Active",
      "Time Spent": calculateDuration(
        item.loginTime,
        item.logoutTime
      ),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Activities");
    XLSX.writeFile(wb, "user-activities.xlsx");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-1">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between mb-3">
        <h2 className="text-xl font-bold">
          User Activity Report
        </h2>

        <div className="flex flex-wrap gap-3">
          {/* Active toggle */}
          <button
            onClick={() => {
              setActiveOnly((p) => !p);
              setCurrentPage(1);
            }}
            className={`px-4 rounded border font-bold ${
              activeOnly
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-600"
            }`}
          >
            Active
          </button>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-1 rounded-lg text-sm"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="teacher">Teacher</option>
          </select>

          {/* Quick filter */}
          <select
            value={quickFilter}
            onChange={(e) => {
              setQuickFilter(e.target.value);
              setDateFilter("");
              setCurrentPage(1);
            }}
            className="border px-3 py-1 rounded-lg text-sm"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last2days">Last 2 Days</option>
          </select>

          {/* Date picker */}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setQuickFilter("all");
                setCurrentPage(1);
              }}
              className="border px-3 py-2 rounded-lg text-sm"
            />
          </div>

          {/* Export */}
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
          >
            <FontAwesomeIcon icon={faFileExcel} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Login</th>
              <th className="px-4 py-2 text-left">Logout</th>
              <th className="px-4 py-2 text-left">Time Spent</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * ITEMS_PER_PAGE +
                      index +
                      1}
                  </td>
                  <td className="px-4 py-2 font-medium">
                    {item.username}
                  </td>
                  <td className="px-4 py-2 capitalize">
                    <span
                      className={`rounded-xl px-3 text-sm font-semibold
                        ${
                          item.role === "superadmin"
                            ? "bg-purple-300"
                            : item.role === "admin"
                            ? "bg-orange-300"
                            : item.role === "teacher"
                            ? "bg-blue-300"
                            : "bg-gray-200"
                        }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(item.loginTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {item.logoutTime ? (
                      new Date(item.logoutTime).toLocaleString()
                    ) : (
                      <span className="text-green-600 bg-green-200 px-2 rounded-xl">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 font-semibold text-blue-600">
                    {calculateDuration(
                      item.loginTime,
                      item.logoutTime
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-3 mt-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className={`px-4  rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>

        <button
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          onClick={() => setCurrentPage((p) => p + 1)}
          className={`px-4 rounded ${
            currentPage === totalPages || totalPages === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserActivities;
