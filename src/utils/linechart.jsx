import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { day: "1", students: 2 },
  { day: "5", students: 6 },
  { day: "10", students: 10 },
  { day: "15", students: 18 },
  { day: "20", students: 25 },
  { day: "25", students: 30 },
  { day: "30", students: 42 },
];

export default function RegistrationLineChart() {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Registrations (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={lineData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="students"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
