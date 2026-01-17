import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faEye,
  faCircle,
  faSleigh,
} from "@fortawesome/free-solid-svg-icons";

import EditExamScheduleModal from "../components/EditExamModal";
import AddExamScheduleModal from "../components/AddExamModal";
import { useState } from "react";

function AdminExamSched() {
  const exams = [
    {
      id: 1,
      name: "Hawkings maths olympiad",
      year: 2025,
      registrationDate: "August 29, 2025",
      onlineExamDate: "September 2, 2025",
      resultDate: "October 1, 2025",
      interviewDate: "October 8, 2025",
      finalResultDate: "October 15, 2025",
      amount: "1.00",
      status: "Active",
    },
     {
      id: 2,
      name: "Hawkings science olympiad",
      year: 2025,
      registrationDate: "August 29, 2025",
      onlineExamDate: "September 2, 2025",
      resultDate: "October 1, 2025",
      interviewDate: "October 8, 2025",
      finalResultDate: "October 15, 2025",
      amount: "1.00",
      status: "Inactive",
    },
  ];

  const [showEditModal,setShowEditModal] = useState(false)
  const [showAddExamModal,setShowAddExamModal] = useState(false)

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          Exam Schedule
        </h1>

        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        onClick={() => {setShowAddExamModal(true)}}
        >
          <FontAwesomeIcon icon={faPlus} />
          ADD
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-[1000px] w-full text-sm ">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3  text-left">Actions</th>
              <th className="p-2  text-left">Name</th>
              <th className="p-2 ">Year</th>
              <th className="p-2 ">Registration Date</th>
              <th className="p-2 ">Online Exam Date</th>
              <th className="p-2 ">Result Date</th>
              <th className="p-2 ">Interview Date</th>
              <th className="p-2 ">Final Result Date</th>
              <th className="p-2 ">Amount</th>
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
                     className={`text-green-500 ${exam.status == "Active" ? "text-green-600" : "text-red-500" 
                      }`}
                    />

                    <button className="text-indigo-600 hover:text-indigo-800" onClick={() =>{setShowEditModal(true)}}>
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                </td>

                <td className="p-3  font-medium">
                  {exam.name}
                </td>
                <td className="p-3  text-center">
                  {exam.year}
                </td>
                <td className="p-3 ">
                  {exam.registrationDate}
                </td>
                <td className="p-3 ">
                  {exam.onlineExamDate}
                </td>
                <td className="p-3 ">
                  {exam.resultDate}
                </td>
                <td className="p-3 ">
                  {exam.interviewDate}
                </td>
                <td className="p-3 ">
                  {exam.finalResultDate}
                </td>
                <td className="p-3  text-center">
                  {exam.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && (<EditExamScheduleModal onClose={() => {setShowEditModal(false)}}/>)}
      {showAddExamModal && (<AddExamScheduleModal onClose={() => {setShowAddExamModal(false)}}/>)}
    </div>
  );
}

export default AdminExamSched;
