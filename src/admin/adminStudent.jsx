import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import StuDeleteModal from "../components/stuDelModal";
import EditStudentModal from "../components/stuEditModal";
import AddStudentModal from "../components/AddStudentModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFileExport,
  faCircle,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function AdminStudent() {
  /* ------------------ STATE ------------------ */
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  /* ------------------ FETCH STUDENTS ------------------ */
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:3000/api/v1/student");
      // Sort by ID descending (newest first)
      const sortedStudents = res.data.data.sort((a, b) => b.id - a.id);
      setStudents(sortedStudents);
    } catch (err) {
      console.error(err);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ FILTER + SEARCH ------------------ */
  const filteredStudents = useMemo(() => {
    let data = students;

    // Search filter
    if (search.trim()) {
      const query = search.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.phone.includes(query) ||
          s.email.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      data = data.filter((s) => s.Status === statusFilter);
    }

    return data;
  }, [students, search, statusFilter]);

  /* ------------------ PAGINATION ------------------ */
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  /* ------------------ EXPORT ------------------ */
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(file, "students.xlsx");
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="bg-white rounded-xl shadow p-2">
      {/* Loading */}
      {loading && (
        <div className="text-center py-4 text-indigo-600 font-semibold">
          Loading students...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-4 text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-2">
        <input
          type="text"
          placeholder="Search by Name / Phone / Email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-1 rounded w-full lg:w-64 focus:ring"
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* Items per page */}
          <p>per page</p>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-1 rounded"
          >
            <FontAwesomeIcon icon={faPlus} />
            ADD
          </button>

          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-1 rounded"
          >
            <FontAwesomeIcon icon={faFileExport} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">S.No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">State</th>
              <th className="p-2">City</th>
              <th className="p-2">Institute</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((s, index) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="px-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className=" font-semibold">{s.name}</td>
                <td className="">{s.Class}</td>
                <td className="">{s.email}</td>
                <td className="">{s.phone}</td>
                <td className="">{s.state}</td>
                <td className="">{s.city}</td>
                <td className="">{s.institute}</td>
                <td className=" text-center">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={
                      s.Status === "pending"
                        ? "text-orange-500"
                        : "text-green-500"
                    }
                  />
                </td>
                <td className="p-1 flex">
                  <button
                    onClick={() => {
                      setSelectedStudent(s);
                      setShowEditModal(true);
                    }}
                    className="text-blue-600 px-1 py-1 "
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedStudent(s);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 px-1 py-1 "
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}

            {!loading && paginatedStudents.length === 0 && (
              <tr>
                <td colSpan="10" className="p-4 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 text-sm">
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="
                    px-3 py-1 border rounded
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    disabled:hover:bg-transparent
                  "
          >
            &lt;
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="
                    px-3 py-1 border rounded
                    hover:bg-gray-100
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    disabled:hover:bg-transparent
                  "
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && selectedStudent && (
        <StuDeleteModal
          studentId={selectedStudent.id}
          onClose={() => setShowDeleteModal(false)}
          refresh={fetchStudents}
        />
      )}

      {showEditModal && selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStudent(null);
          }}
          refresh={fetchStudents}
        />
      )}

      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          refresh={fetchStudents}
        />
      )}
    </div>
  );
}

export default AdminStudent;
