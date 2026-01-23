import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

/* ------------------ STATIC STUDENT TESTIMONIALS ------------------ */
const studentTestimonials = [
  {
    id: 1,
    name: "Aarav",
    class: "Class 5",
    message:
      "Maths became fun after joining Hawkings Olympiad. The questions made me think in a new way!",
    rating: 5,
  },
  {
    id: 2,
    name: "Ananya",
    class: "Class 4",
    message:
      "I enjoyed solving logic questions. It helped me improve my confidence in exams.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohit",
    class: "Class 6",
    message:
      "The competition was exciting and challenging. I want to participate again!",
    rating: 4,
  },
];

/* ------------------ STUDENT CARD ------------------ */
function TestimonialCard({ data }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 
                 hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300"
    >
      <FontAwesomeIcon
        icon={faQuoteLeft}
        className="text-purple-500 text-3xl mb-4"
      />

      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {data.message}
      </p>

      <div className="flex gap-1 mb-4">
        {[...Array(data.rating)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-400"
          />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-r 
                     from-purple-500 to-indigo-500 
                     flex items-center justify-center 
                     text-white font-bold"
        >
          {data.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold">{data.name}</h4>
          <p className="text-xs text-gray-500">{data.class}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------ PARENT CARD ------------------ */
function ParentTestimonialCard({ data }) {
  return (
    <div
      className="bg-gradient-to-br from-gray-100 to-gray-50 
                 rounded-2xl border border-gray-200 p-6
                 hover:shadow-lg transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-3 py-1 text-xs font-semibold rounded-full 
                     bg-indigo-100 text-indigo-700"
        >
          Parent Review
        </span>

        <div className="flex gap-1">
          {[...Array(data.rating)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className="text-yellow-400 text-sm"
            />
          ))}
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        “{data.content}”
      </p>

      <div className="flex items-center gap-3 border-t pt-4">
        <div
          className="w-11 h-11 rounded-full bg-indigo-600
                     flex items-center justify-center 
                     text-white font-bold"
        >
          {data.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{data.name}</h4>
          <p className="text-xs text-gray-500">Parent</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------ MAIN COMPONENT ------------------ */
export default function Testimonials() {
  const [parentTestimonials, setParentTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  /* FETCH ONLY PUBLISHED PARENT TESTIMONIALS */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/parent-testinomials/published")
      .then((res) => {
        setParentTestimonials(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* PAGE TITLE */}
      <div className="text-center mb-14 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Testimonials
        </h1>
        <p className="text-gray-600 mt-3">
          Hear what students and parents say about Hawkings Maths Olympiad
        </p>
      </div>

      {/* PARENT TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Parent Testimonials
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : parentTestimonials.length === 0 ? (
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gray-100 to-gray-50 
                rounded-2xl border border-gray-200 p-6
                hover:shadow-lg transition-all">
  <p className="text-gray-700 text-sm leading-relaxed mb-6">
    “Hawking Maths Olympiad helped my child develop better logical thinking.
    The questions were challenging yet age-appropriate, and it encouraged
    a deeper understanding of concepts.”
  </p>
  <div className="flex items-center gap-3 border-t pt-4">
    <div className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center text-white font-bold">
      N
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">
        Narasimha Reddy
      </h4>
      <p className="text-xs text-gray-500">
        Parent
      </p>
    </div>
  </div>
</div>

<div className="bg-gradient-to-br from-gray-100 to-gray-50 
                rounded-2xl border border-gray-200 p-6
                hover:shadow-lg transition-all">
  <p className="text-gray-700 text-sm leading-relaxed mb-6">
    “I noticed a significant improvement in my daughter’s problem-solving
    skills after participating in the Hawking Maths Olympiad. It motivated
    her to practice maths with interest rather than fear.”
  </p>
  <div className="flex items-center gap-3 border-t pt-4">
    <div className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center text-white font-bold">
      S
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">
        Sujatha Rao
      </h4>
      <p className="text-xs text-gray-500">
        Parent
      </p>
    </div>
  </div>
</div>

<div className="bg-gradient-to-br from-gray-100 to-gray-50 
                rounded-2xl border border-gray-200 p-6
                hover:shadow-lg transition-all">
  <p className="text-gray-700 text-sm leading-relaxed mb-6">
    “The Olympiad provided a healthy academic challenge for my son.
    The focus on concepts rather than memorization made it a valuable
    learning experience.”
  </p>
  <div className="flex items-center gap-3 border-t pt-4">
    <div className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center text-white font-bold">
      R
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">
        Ravi Kumar
      </h4>
      <p className="text-xs text-gray-500">
        Parent
      </p>
    </div>
  </div>
</div>

<div className="bg-gradient-to-br from-gray-100 to-gray-50 
                rounded-2xl border border-gray-200 p-6
                hover:shadow-lg transition-all">
  <p className="text-gray-700 text-sm leading-relaxed mb-6">
    “Hawking Maths Olympiad helped us understand our child’s strengths
    and areas for improvement. The overall experience was smooth and
    academically enriching.”
  </p>
  <div className="flex items-center gap-3 border-t pt-4">
    <div className="w-11 h-11 rounded-full bg-indigo-600
                    flex items-center justify-center text-white font-bold">
      L
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">
        Lakshmi Devi
      </h4>
      <p className="text-xs text-gray-500">
        Parent
      </p>
    </div>
  </div>
</div>

          </div>
          
    
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {parentTestimonials.map((item) => (
              <ParentTestimonialCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </section>

      {/* STUDENT TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 mb-20 mt-14">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Student Testimonials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {studentTestimonials.map((item) => (
            <TestimonialCard key={item.id} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
