import StudentsPieChart from "../utils/piechart";
import RegistrationLineChart from "../utils/linechart";

const Card = ({ title, percent }) => (
  <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
    <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>

    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>

    <p className="text-sm mt-2 text-blue-600 font-semibold">
      {percent}% Filled
    </p>
  </div>
);

const Dashboard = () => {
  const data = [
    { title: "Class 4", percent: 10 },
    { title: "Class 5", percent: 15 },
    { title: "Class 6", percent: 13 },
    { title: "Class 7", percent: 19 },
    { title: "Class 8", percent: 15 },
    { title: "Class 9", percent: 9 },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StudentsPieChart />
        <RegistrationLineChart />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
