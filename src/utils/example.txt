import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

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

const parentTestimonials = [
  {
    id: 1,
    name: "Suresh Kumar",
    role: "Parent of Class 5 Student",
    message:
      "Hawkings Maths Olympiad helped my child develop logical thinking. The platform is very well designed.",
    rating: 5,
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    role: "Parent of Class 4 Student",
    message:
      "I noticed a big improvement in my child’s confidence and problem-solving skills.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ramesh Rao",
    role: "Parent of Class 6 Student",
    message:
      "A great initiative for students. The questions are age-appropriate and engaging.",
    rating: 3,
  },
];

function TestimonialCard({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 
                    hover:shadow-xl hover:-translate-y-1 
                    transition-all duration-300">
      <FontAwesomeIcon
        icon={faQuoteLeft}
        className="text-purple-500 text-3xl mb-4"
      />

      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {data.message}
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(data.rating)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-400"
          />
        ))}
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 
                        flex items-center justify-center text-white font-bold">
          {data.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold">{data.name}</h4>
          <p className="text-xs text-gray-500">
            {data.class || data.role}
          </p>
        </div>
      </div>
    </div>
  );
}

function ParentTestimonialCard({ data }) {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-50 
                    rounded-2xl border border-gray-200 p-6
                    hover:shadow-lg transition-all">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full 
                         bg-indigo-100 text-indigo-700">
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

      {/* Message */}
      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        “{data.message}”
      </p>

      {/* Parent Info */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div className="w-11 h-11 rounded-full bg-indigo-600
                        flex items-center justify-center text-white font-bold">
          {data.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">
            {data.name}
          </h4>
          <p className="text-xs text-gray-500">
            {data.role}
          </p>
        </div>
      </div>
    </div>
  );
}


export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">

      {/* Page Title */}
      <div className="text-center mb-14 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Testimonials
        </h1>
        <p className="text-gray-600 mt-3">
          Hear what students and parents say about Hawkings Maths Olympiad
        </p>
      </div>

      {/* Parent Testimonials */}
      <section className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
           Parent Testimonials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {parentTestimonials.map((item) => (
            <ParentTestimonialCard key={item.id} data={item} />
          ))}
        </div>
      </section>


      {/* Student Testimonials */}
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
