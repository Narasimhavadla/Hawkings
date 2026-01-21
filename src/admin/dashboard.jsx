const Card = ({ title, percent }) => (
  <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
    <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-600 h-3 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
    <p className="text-sm mt-2 text-blue-600 font-semibold">{percent}% Filled</p>
  </div>
);

import  StudentsPieChart  from "../utils/piechart";
import RegistrationLineChart from "../utils/linechart";

const Dashboard = () => {
  const data = [
    // { title: "Total Seats Filled", percent: 14 },
    { title: "Class 4", percent: 10 },
    { title: "Class 5", percent: 15 },
    { title: "Class 6", percent: 13 },
    { title: "Class 7", percent: 19 },
    { title: "Class 8", percent: 15 },
    { title: "Class 9", percent: 9 },
  ];

  return (
    <div>
    <div>
      <StudentsPieChart />
      <RegistrationLineChart />
    </div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
