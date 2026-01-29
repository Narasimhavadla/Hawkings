import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TeacherPieChart() {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const teacherId = authUser?.teacherId;

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/teacher/${teacherId}/students-pie`
        );

        if (res.data.status) {
          const labels = res.data.data.map((d) => d.name);
          const values = res.data.data.map((d) => d.value);

          setChartData({
            labels,
            datasets: [
              {
                label: "Students per Class",
                data: values,
                backgroundColor: [
                  "#4f46e5",
                  "#6366f1",
                  "#818cf8",
                  "#a5b4fc",
                  "#c7d2fe",
                  "#e0e7ff",
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacherId]);

  if (loading) return <p className="text-center text-gray-500">Loading Pie Chart...</p>;
  if (!chartData) return <p className="text-center text-gray-500">No Data Available</p>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        }}
      />
    </div>
  );
}
