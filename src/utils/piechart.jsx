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
  { id: "g1", from: "#60a5fa", to: "#4f46e5" },
  { id: "g2", from: "#6366f1", to: "#6366f1" },
  { id: "g3", from: "#818cf8", to: "#818cf8" },
  { id: "g4", from: "#a5b4fc", to: "#a5b4fc" },
  { id: "g5", from: "#c7d2fe", to: "#c7d2fe" },
  { id: "g6", from: "#e0e7ff", to: "#e0e7ff" },
];

export default function StudentsPieChart() {
  const [data, setData] = useState([]);

const api =import.meta.env.VITE_API_BASE_URL


  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get(`${api}/student-pie`,{
      headers : {
        Authorization : `Bearer ${token}`
      }
    })
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
