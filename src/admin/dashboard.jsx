// import StudentsPieChart from "../utils/piechart";
// import RegistrationLineChart from "../utils/linechart";

// const Card = ({ title, percent }) => (
//   <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
//     <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>

//     <div className="w-full bg-gray-200 rounded-full h-3">
//       <div
//         className="bg-blue-600 h-3 rounded-full transition-all"
//         style={{ width: `${percent}%` }}
//       />
//     </div>

//     <p className="text-sm mt-2 text-blue-600 font-semibold">
//       {percent}% Filled
//     </p>
//   </div>
// );

// const Dashboard = () => {
//   const data = [
//     { title: "Class 4", percent: 10 },
//     { title: "Class 5", percent: 15 },
//     { title: "Class 6", percent: 13 },
//     { title: "Class 7", percent: 19 },
//     { title: "Class 8", percent: 15 },
//     { title: "Class 9", percent: 9 },
//   ];

//   return (
//     <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
    
//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
//         <StudentsPieChart />
//         <RegistrationLineChart />
//       </div>

//       {/* Stats Cards */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data.map((item, index) => (
//           <Card key={index} {...item} />
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard;


import StudentsPieChart from "../utils/piechart";
import RegistrationLineChart from "../utils/linechart";
import { useState,useEffect } from "react";
import axios from "axios";
export default function Dashboard() {
const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/student-pie")
      .then((res) => {
        // setPieData(res.data.data);
        setTotalStudents(res.data.meta.totalStudents);
      })
      .catch(console.error);

      
  }, []);

  const [examStats, setExamStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/exam-schedule")
      .then((res) => {
        const meta = res.data.meta;

        setExamStats({
          total: meta.total_examSchedule,
          active: meta.activeExams,
          inactive: meta.inactiveExams,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Hawking Olympiad – Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Maths Olympiad Analytics & Insights</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Students" value={totalStudents} />
        <KpiCard title="Tests Conducted" value={examStats.total} />
        <KpiCard title="Active Exams" value={examStats.active} />
        <KpiCard title="Qualified Students" value="XXXX" />
      </div>

      {/* ROW 1: GROWTH + DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Class-wise Average Score</h3>
          <div className="h-64" />
        </div>

        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-3">Result Breakdown</h3>
          <div className="h-64" />
        </div>
      </div>

      {/* ROW 3: SUBJECT INSIGHTS */}
      <div className="bg-white rounded-2xl p-5 shadow">
        <h3 className="font-semibold mb-3">Topic-wise Accuracy</h3>
        <div className="h-72" />
      </div>
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
