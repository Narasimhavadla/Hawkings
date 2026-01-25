
export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hawking Maths Olympiad – Teacher Dashboard</h1>
        {/* <button className="rounded-2xl bg-blue-600 px-4 py-2 text-white shadow">
          Register Student
        </button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-2xl font-semibold">1,250</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Active Exams</p>
          <p className="text-2xl font-semibold">48</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Exams Conducted</p>
          <p className="text-2xl font-semibold">12</p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Average Score</p>
          <p className="text-2xl font-semibold">67%</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 font-semibold">Class-wise Performance</h2>
          <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
            Bar Chart Placeholder
          </div>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 font-semibold">Subject-wise Accuracy</h2>
          <div className="flex h-48 items-center justify-center rounded-xl bg-gray-50 text-gray-400">
            Pie Chart Placeholder
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
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
      </div>
    </div>
  );
}
