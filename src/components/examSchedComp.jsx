import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const examSchedule = [
  {
    title: "Last Registration Date",
    date: "August 29, 2025",
  },
  {
    title: "Online Exam Date",
    date: "September 2, 2025",
  },
  {
    title: "Online Exam Result",
    date: "October 1, 2025",
  },
  {
    title: "Online Live Interview",
    date: "October 8, 2025",
  },
  {
    title: "Final Result Date",
    date: "October 15, 2025",
  },
];

function ExamCard({ data }) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="bg-indigo-500 text-white p-4 rounded-full mb-4 shadow-md hover:scale-110 transition-transform duration-300">
        <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
      </div>
      <h3 className="font-semibold text-lg text-gray-800">{data.title}</h3>
      <p className="text-gray-500 mt-2">{data.date}</p>
    </div>
  );
}

export default function ExamScheduleComp() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">Exam Schedule</h2>
        <p className="text-gray-500 mt-2">Important dates to remember</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {examSchedule.map((item, i) => (
          <ExamCard key={i} data={item} />
        ))}
      </div>
    </section>
  );
}
