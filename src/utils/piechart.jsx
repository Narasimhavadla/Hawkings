import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const gradients = [
  { id: "g1", from: "#60a5fa", to: "#2563eb" },
  { id: "g2", from: "#4ade80", to: "#16a34a" },
  { id: "g3", from: "#fb923c", to: "#ea580c" },
  { id: "g4", from: "#c084fc", to: "#7c3aed" },
  { id: "g5", from: "#fde047", to: "#ca8a04" },
  { id: "g6", from: "#f87171", to: "#dc2626" },
];

export default function StudentsPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/student-pie")
      .then((res) => setData(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-2 rounded-xl shadow hover:shadow-lg transition">
      

      <ResponsiveContainer width="100%" height={240} className="">
        <PieChart>
          <defs>
            {gradients.map((g) => (
              <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={g.from} />
                <stop offset="100%" stopColor={g.to} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={0}
            outerRadius={120}
            paddingAngle={0}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={`url(#${gradients[index % gradients.length].id})`}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
       

      </ResponsiveContainer>
    </div>
  );
}
