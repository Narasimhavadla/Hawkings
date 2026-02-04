import { useEffect, useState } from "react";
import axios from "axios";
import TeacherPieChart from "./charts/teacherPie";

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    activeExams: 0,
    examsWithStudents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
    const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.teacherId;

  const api =import.meta.env.VITE_API_BASE_URL

const token = localStorage.getItem("token")


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          `${api}/teacher/${teacherId}/dashboard`,
          {
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        if (res.data.status) {
          setDashboardData(res.data.data);
        } else {
          setError("Failed to fetch dashboard data");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Hawking Maths Olympiad – Teacher Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-semibold">{dashboardData.totalStudents}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Active Exams</p>
          <p className="text-2xl font-semibold">{dashboardData.activeExams}</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Exams Conducted</p>
          <p className="text-2xl font-semibold">{dashboardData.examsWithStudents}</p>
        </div>
        {/* <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-semibold">XX %</p>
        </div> */}
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 font-semibold">Class wise students</h2>
          <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
           
            <TeacherPieChart />

          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          {/* <h2 className="mb-4 font-semibold">Class-wise Performance</h2>
          <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
            Add run
          </div> */}
          <h1>Advertisement</h1>
        </div>
        
      </div>

      {/* Table Section */}
      {/* <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-4 font-semibold">Recent Student Attempts</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Student</th>
              <th>Class</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Ananya R</td>
              <td>Class 6</td>
              <td>82%</td>
              <td className="text-green-600">Qualified</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Rahul K</td>
              <td>Class 7</td>
              <td>61%</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
            <tr>
              <td className="py-2">Meera S</td>
              <td>Class 8</td>
              <td>45%</td>
              <td className="text-red-600">Not Qualified</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
