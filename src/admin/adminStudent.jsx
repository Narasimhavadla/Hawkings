import { useState, useMemo } from "react";
import StuDeleteModal from "../components/stuDelModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditStudentModal from "../components/stuEditModal";
import AddStudentModal from "../components/AddStudentModal";
import {
  faPlus,
  faFileExport,
  faCircle,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AdminStudent() {
  const students = [
    {
      id: 1,
      name: "ganesh",
      class: "Class 5",
      email: "ganeshpamar337@gmail.com",
      phone: "8657924197",
      state: "Arunachal Pradesh",
      city: "Mumbai-City",
      institute: "dd",
      status: "pending",
    },
    {
      id: 2,
      name: "kishore",
      class: "Class 5",
      email: "ganeshpamar337@gmail.com",
      phone: "8657924197",
      state: "Arunachal Pradesh",
      city: "Mumbai-City",
      institute: "dd",
      status: "pending",
    },
    {
      id: 3,
      name: "Kunal",
      class: "Class 7",
      email: "harshsharma18051982@gmail.com",
      phone: "9671242035",
      state: "Haryana",
      city: "Palwal",
      institute: "G.M",
      status: "completed",
    },
    {
      id: 4,
      name: "santosh",
      class: "Class 7",
      email: "harshsharma18051982@gmail.com",
      phone: "9671242035",
      state: "Haryana",
      city: "Palwal",
      institute: "G.M",
      status: "completed",
    },
    {
      id: 5,
      name: "krisna",
      class: "Class 7",
      email: "harshsharma18051982@gmail.com",
      phone: "9671242035",
      state: "Haryana",
      city: "Palwal",
      institute: "G.M",
      status: "completed",
    },
    {
      id: 6,
      name: "veda",
      class: "Class 7",
      email: "narasimha@gmail.com",
      phone: "9671242035",
      state: "Haryana",
      city: "Palwal",
      institute: "G.M",
      status: "completed",
    },
  ];

  /* ------------------ STATE ------------------ */
  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal,setShowEditModal] = useState(false)
  const [shoeAddModal,setShowAddModal] = useState(false)

  /* ------------------ SEARCH ------------------ */
  const filteredStudents = useMemo(() => {
  if (!search.trim()) return students;

  const query = search.toLowerCase();

  return students.filter((s) =>
    s.name.toLowerCase().includes(query) ||
    s.phone.includes(query) ||
    s.email.toLowerCase().includes(query)
  );
}, [search, students]);

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

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-full lg:w-64 focus:outline-none focus:ring"
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* Items per page */}
          <div className="flex items-center gap-2 text-sm">
            <span>Items per page:</span>
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
            </select>
          </div>

          {/* Buttons */}
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() =>{setShowAddModal(true)}}
          >
            <FontAwesomeIcon icon={faPlus} />
            ADD
          </button>

          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            <FontAwesomeIcon icon={faFileExport} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 ">
            <tr className="">
              <th className="p-2 ">S.No</th>
              <th className="p-2 ">Name</th>
              <th className="p-2 ">Class</th>
              <th className="p-2 ">Email</th>
              <th className="p-2 ">Phone</th>
              <th className="p-2 ">State</th>
              <th className="p-2 ">City</th>
              <th className="p-2 ">Institute</th>
              <th className="p-2 ">Status</th>
              <th className="p-2 ">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedStudents.map((s, index) => (
              <tr key={s.id} className="hover:bg-gray-50 border-t">
                <td className="p-2 ">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2  font-semibold">{s.name}</td>
                <td className="p-2 ">{s.class}</td>
                <td className="p-2 ">{s.email}</td>
                <td className="p-2  font-semibold">{s.phone}</td>
                <td className="p-2 ">{s.state}</td>
                <td className="p-2 ">{s.city}</td>
                <td className="p-2 ">{s.institute}</td>

                {/* Status */}
                <td className="p-2 text-center">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={
                      s.status === "pending"
                        ? "text-orange-500"
                        : s.status === "completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  />
                </td>

                {/* Actions */}
                <td className="p-2">
                  <div className="flex gap-3">
                    <button className="bg-orange-300 px-2 py-1 rounded" onClick={() => {setShowEditModal(true)}}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button className="bg-red-400 px-2 py-1 rounded" onClick={() => {setShowDeleteModal(true)}}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {paginatedStudents.length === 0 && (
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
      <div className="flex items-center justify-between mt-4 text-sm">
        <span>
          Page {currentPage} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            &lt;
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            &gt;
          </button>
        </div>
      </div>

      {showDeleteModal &&  <StuDeleteModal onClose ={() => {setShowDeleteModal(false) }}/>}
        {showEditModal && <EditStudentModal  onClose = {() =>{setShowEditModal(false)}}/>}
          {shoeAddModal && (<AddStudentModal onClose={() =>{setShowAddModal(false)}} />)}
    </div>
  );
}

export default AdminStudent;
