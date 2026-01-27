import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faTrophy,
  faUsers,
  faStar,
  faSchool,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import RazorpayPayment from "./RazorpayPayment";

function Aboutus() {
  return (
    <div className="bg-gray-50">

            {/* Test Payment Section */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Try Our Payment Gateway
            </h2>
            <p className="text-gray-600 mb-6">
              Make a ₹1 test payment to experience our secure Razorpay checkout.
            </p>

            <RazorpayPayment />
          </div>
        </section>


      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
            About Hawkings Maths Olympiad
          </h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto">
            Inspiring young minds to explore the beauty of mathematics through
            fun, logic, and national-level competition.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <FontAwesomeIcon icon={faLightbulb} className="text-purple-600 text-4xl mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to nurture curiosity, problem-solving skills, and
            confidence in students by providing a joyful and competitive
            platform to excel in mathematics.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">
          <FontAwesomeIcon icon={faStar} className="text-blue-600 text-4xl mb-4" />
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become India’s most trusted and loved mathematics olympiad,
            empowering students across schools to think logically and dream
            big.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose Hawkings?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: faBrain,
                title: "Conceptual Learning",
                desc: "Focus on understanding concepts rather than memorization.",
              },
              {
                icon: faTrophy,
                title: "National Recognition",
                desc: "Win certificates, medals, and national-level recognition.",
              },
              {
                icon: faSchool,
                title: "School Friendly",
                desc: "Designed according to school curriculum and standards.",
              },
              {
                icon: faUsers,
                title: "Expert Team",
                desc: "Questions designed by experienced educators.",
              },
              {
                icon: faStar,
                title: "Student-Centric",
                desc: "Encouraging environment that builds confidence.",
              },
              {
                icon: faLightbulb,
                title: "Fun & Logical",
                desc: "Maths made enjoyable through logical challenges.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-2xl p-6 shadow-md 
                           hover:bg-indigo-50 hover:shadow-xl transition-all"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-4xl text-indigo-600 mb-4 group-hover:scale-110 transition"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold">10,000+</h3>
            <p className="text-indigo-200">Students</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-indigo-200">Schools</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">4+</h3>
            <p className="text-indigo-200">States</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">100+</h3>
            <p className="text-indigo-200">Top Educators</p>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Building Confidence Through Mathematics
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At Hawkings Maths Olympiad, we believe every child can love maths when
          learning is joyful, encouraging, and meaningful. Join us in shaping
          the problem solvers of tomorrow.
        </p>
      </section>

    </div>
  );
}

export default Aboutus;
