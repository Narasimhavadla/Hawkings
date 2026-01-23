import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import AddTeacherModal from "../components/AddTeacherModal";
import EditTeacherModal from "../components/EditTeacherModal";
import DeleteTeacherModal from "../components/DeleteTeacherModal";

export default function AdminTeacherRegistration() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showEditTeacherModal, setShowEditTeacherModal] = useState(false);
  const [showDelTeacherModal, setShowDelTeacherModal] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  /* 🔹 Fetch teachers */
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/v1/teachers");
      setTeachers(res.data?.data || []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  /* 🔹 Search */
  const filteredTeachers = teachers.filter((t) =>
    [t.name, t.school, t.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* 🔹 Pagination */
  const totalPages = Math.ceil(filteredTeachers.length / pageSize);
  const paginatedTeachers = filteredTeachers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="p-4 md:p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Teacher Registrations
        </h1>
        <button
          onClick={() => setShowAddTeacherModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg shadow"
        >
          + Add Teacher
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <input
          placeholder="Search by name, school or phone"
          className="border rounded-lg px-4 py-1 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="border rounded-lg px-3 py-1 w-full md:w-auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">School</th>
              <th className="px-4 py-2 text-left">Qualification</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">UPI ID</th>
              <th className="px-4 py-2 text-left">Range</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : paginatedTeachers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No teachers found
                </td>
              </tr>
            ) : (
              paginatedTeachers.map((t) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 font-semibold">{t.name}</td>
                  <td className="px-4 py-2">{t.school}</td>
                  <td className="px-4 py-2">{t.qualification}</td>
                  <td className="px-4 py-2">{t.phone}</td>
                  <td className="px-4 py-2">{t.email}</td>
                  <td className="px-4 py-2">{t.upiId}</td>
                  <td className="px-4 py-2">
                    {t.teachingFrom} - {t.teachingTo}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-4">
                    <button
                      className="text-purple-700 hover:text-purple-900"
                      onClick={() => {
                        setSelectedTeacher(t);
                        setShowEditTeacherModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setSelectedTeacher(t);
                        setShowDelTeacherModal(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      {showAddTeacherModal && (
        <AddTeacherModal
          onClose={() => setShowAddTeacherModal(false)}
          onSuccess={fetchTeachers}
        />
      )}

      {showEditTeacherModal && selectedTeacher && (
        <EditTeacherModal
          teacher={selectedTeacher}
          onClose={() => setShowEditTeacherModal(false)}
          onSuccess={fetchTeachers}
        />
      )}

      {showDelTeacherModal && selectedTeacher && (
        <DeleteTeacherModal
          teacherId={selectedTeacher.id}
          teacherName={selectedTeacher.name}
          onClose={() => setShowDelTeacherModal(false)}
          onSuccess={fetchTeachers}
        />
      )}
    </div>
  );
}
