
import StudentsPieChart from "../utils/piechart";
import RegistrationLineChart from "../utils/linechart";
import { useState,useEffect } from "react";
import axios from "axios";
export default function Dashboard() {
const [totalStudents, setTotalStudents] = useState(0);
const [totalTeachers,setTotalTeachers] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/dashboard-data")
      .then((res) => {
        // setPieData(res.data.data);
        setTotalStudents(res.data.meta.totalStudents);
        setExamStats({
                  total: res.data.meta.total_examSchedule,
                  active: res.data.meta.activeExams,
                  inactive: res.data.meta.inactiveExams,
                });    
        setTotalTeachers(res.data.meta.totalTeachers);
          
         })
      .catch(console.error);

      
  }, []);

  const [examStats, setExamStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });


  return (
    <div className="min-h-screen bg-gray-100 p-2">
      {/* HEADER */}
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-gray-800">Hawking Olympiad – Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Maths Olympiad Analytics & Insights</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <KpiCard title="Total Students" value={totalStudents} />
        <KpiCard title="Tests Conducted" value={examStats.total} />
        <KpiCard title="Active Exams" value={examStats.active} />
        <KpiCard title="Teachers Registered" value={totalTeachers} />
      </div>

      {/* ROW 1: GROWTH + DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
        <div className="bg-white rounded-2xl p-4 shadow">
          {/* RegistrationLineChart */}
          <h3 className="font-semibold mb-3">Registrations – Last 30 Days</h3>
          
          {/* <div className="h-64 border" /> */}
          <div className="h-68 ">
            <RegistrationLineChart />
          </div>  

        </div>

        <div className="bg-white rounded-2xl p-3 shadow">
          {/* StudentsPieChart */}
          <h3 className="font-semibold mb-3">Class-wise Student Distribution</h3>
          {/* <div className="h-64" /> */}
          <div className="h-68">
            <StudentsPieChart />
          </div> 
        </div>
      </div>

      {/* ROW 2: PERFORMANCE */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Class-wise Average Score</h3>
          <div className="h-64" />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Result Breakdown</h3>
          <div className="h-64" />
        </div>
      </div> */}

      {/* ROW 3: SUBJECT INSIGHTS */}
      {/* <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="font-semibold mb-3">Topic-wise Accuracy</h3>
        <div className="h-72" />
      </div> */}
    </div>
  );
}

function KpiCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
}
