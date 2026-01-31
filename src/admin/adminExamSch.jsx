import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faCircle,faTrash } from "@fortawesome/free-solid-svg-icons";

import EditExamScheduleModal from "../components/EditExamModal";
import AddExamScheduleModal from "../components/AddExamModal";
import DeleteExamScheduleModal from "../components/DelExamModal";
import { useEffect, useState } from "react";
import axios from "axios";

function AdminExamSched() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null); // 🔹 store ID
  const [selectExamName,setSelectExamName] = useState(null)
  const [showAddExamModal, setShowAddExamModal] = useState(false);
  const [showDelModal, setShowDeleteModal] = useState(false)

  /* 🔹 Fetch Exam Schedules */
  const fetchExamSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:3000/api/v1/exam-schedule"
      );

      if (res.data.status) {
        setExams(res.data.data);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch exam schedules"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExamSchedules();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Exam Schedule</h1>

        <button
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={() => setShowAddExamModal(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
          ADD
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 bg-red-50 text-red-600 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-6 text-gray-500">
          Loading exam schedules...
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-[1000px] w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Actions</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2">Year</th>
                <th className="p-2">Registration Date</th>
                <th className="p-2">Online Exam Date</th>
                <th className="p-2">Result Date</th>
                <th className="p-2">Interview Date</th>
                <th className="p-2">Final Result Date</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>

            <tbody>
              {exams.map((exam) => (
                <tr
                  key={exam.id}
                  className="hover:bg-gray-50 transition border-t"
                >
                  {/* Actions */}
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={
                          exam.status === "active"
                            ? "text-green-600"
                            : "text-red-500"
                        }
                      />

                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => {
                          setSelectedExamId(exam.id); // 🔹 set exam ID
                          setShowEditModal(true); // 🔹 open modal
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button
                        className="text-indigo-600 text-orange-600"
                        onClick={() => {
                          setSelectedExamId(exam.id); // 🔹 set exam ID
                          setShowDeleteModal(true); // 🔹 open modal
                          setSelectExamName(exam.name)

                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>

                  <td className="p-3 font-medium">{exam.examName}</td>
                  <td className="p-3 text-center">{exam.year}</td>
                  <td className="p-3">{formatDate(exam.lastRegistrationDate)}</td>
                  <td className="p-3">{formatDate(exam.onlineExamDate)}</td>
                  <td className="p-3">{formatDate(exam.onlineExamResultDate)}</td>
                  <td className="p-3">{formatDate(exam.onlineLiveInterviewDate)}</td>
                  <td className="p-3">{formatDate(exam.finalResultDate)}</td>
                  <td className="p-3 text-center">{exam.amount}</td>
                </tr>
              ))}

              {exams.length === 0 && !loading && (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    No exam schedules found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showEditModal && selectedExamId && (
        <EditExamScheduleModal
          examId={selectedExamId} // 🔹 pass examId correctly
          onClose={() => setShowEditModal(false)}
          onSuccess={fetchExamSchedules} // refresh table
        />
      )}

      {showAddExamModal && (
        <AddExamScheduleModal
          onClose={() => setShowAddExamModal(false)}
          onSuccess={fetchExamSchedules}
        />
      )}
      {showDelModal && <DeleteExamScheduleModal 
          examId={selectedExamId} // 🔹 pass examId correctly
          examName = {selectExamName}
          onClose={() => setShowDeleteModal(false)}
          refresh = {fetchExamSchedules}
      
      />}
    </div>
  );
}

export default AdminExamSched;
