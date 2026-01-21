import React from "react";
import class4Pdf from "../assets/class4.pdf";
import class5Pdf from "../assets/class5.pdf";
import class6Pdf from "../assets/class6.pdf";
import class7Pdf from "../assets/class7.pdf";
import class8Pdf from "../assets/class8.pdf";
import class9Pdf from "../assets/class9.pdf";

const classes = [
  {
    name: "Class 4",
    seatsFilled: 10,
    syllabus: class4Pdf,
  },
  {
    name: "Class 5",
    seatsFilled: 15,
    syllabus: class5Pdf,
  },
  {
    name: "Class 6",
    seatsFilled: 13,
    syllabus: class6Pdf,
  },
  {
    name: "Class 7",
    seatsFilled: 19,
    syllabus: class7Pdf,
  },
  {
    name: "Class 8",
    seatsFilled: 15,
    syllabus: class8Pdf,
  },
  {
    name: "Class 9",
    seatsFilled: 9,
    syllabus:class9Pdf,
  },
];

function ClassCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{data.name}</h3>

      {/* Seats Filled */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Seats Filled</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${data.seatsFilled}%` }}
          >
            <span className="sr-only">{data.seatsFilled}%</span>
          </div>
        </div>
        <p className="text-sm text-blue-600 mt-1 font-medium">
          {data.seatsFilled}%
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-auto">
        <a href="/maths-competetion-registration" className="flex-1 bg-indigo-600 text-white py-1 px-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
          Apply
        </a>
        <a
          href={data.syllabus}
          download
          className="flex-1 bg-pink-500 text-white py-1 px-3 rounded-md hover:bg-pink-600 transition-colors duration-300 text-center"
        >
          Syllabus
        </a>
      </div>
    </div>
  );
}

export default function ClassApplySection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Choose Your Class & Apply
        </h2>
        <p className="mt-2 text-gray-600">
          Registration Processing Fee <span className="font-bold text-indigo-600">₹1.00</span> only
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          After filling the application form and payment, you will get an auto acknowledgement on your registered E-mail ID from Hawkings within 24 hours.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {classes.map((cls, i) => (
          <ClassCard key={i} data={cls} />
        ))}
      </div>
    </section>
  );
}
