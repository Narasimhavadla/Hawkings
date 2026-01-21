import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Class 4", value: 10 },
  { name: "Class 5", value: 15 },
  { name: "Class 6", value: 13 },
  { name: "Class 7", value: 19 },
  { name: "Class 8", value: 15 },
  { name: "Class 9", value: 9 },
];

const gradients = [
  { id: "g1", from: "#60a5fa", to: "#2563eb" },
  { id: "g2", from: "#4ade80", to: "#16a34a" },
  { id: "g3", from: "#fb923c", to: "#ea580c" },
  { id: "g4", from: "#c084fc", to: "#7c3aed" },
  { id: "g5", from: "#fde047", to: "#ca8a04" },
  { id: "g6", from: "#f87171", to: "#dc2626" },
];



export default function StudentsPieChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-gray-700 mb-4">
        Students Distribution by Class
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          {/* Gradient Definitions */}
          <defs>
            {gradients.map((g) => (
              <linearGradient
                key={g.id}
                id={g.id}
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor={g.from} />
                <stop offset="100%" stopColor={g.to} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={0}          // full pie (no donut gap)
            outerRadius={120}
            paddingAngle={0}         // ❌ NO SPACES
            labelLine={false}
            isAnimationActive
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
