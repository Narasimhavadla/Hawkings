import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function RegistrationLineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/student-line")
      .then((res) => {
        const labels = res.data.data.map(d => d.day);
        const values = res.data.data.map(d => d.students);

        setChartData({
          labels,
          datasets: [
            {
              label: "Students Registered",
              data: values,
              borderColor: "#2563eb", 
              backgroundColor: "#2563eb",
              pointBackgroundColor: "#2563eb",
               pointBorderColor: "#2563eb",
              borderWidth: 2,
              tension: 0.4,
              fill: false,
            },
          ],
        });
      })
      .catch(console.error);
  }, []);

  if (!chartData) return null;

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
      
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 },
            },
          },
        }}
      />
    </div>
  );
}
