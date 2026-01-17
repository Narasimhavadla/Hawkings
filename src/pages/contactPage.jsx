import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Title */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Get in Touch
        </h1>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Call Us */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center gap-5 
                        hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <FontAwesomeIcon icon={faPhone} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Call Us On</h3>
            <p className="text-gray-600 mt-1">90327 08639</p>
          </div>
        </div>

        {/* Email Us */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center gap-5 
                        hover:shadow-xl hover:-translate-y-1 transition-all">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FontAwesomeIcon icon={faEnvelope} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p className="text-gray-600 mt-1 break-all">
              support@hawkingmathsolympiad.com
            </p>
          </div>
        </div>

      </div>

      {/* Message Section */}
      <div className="max-w-6xl mx-auto px-6 mt-14 pb-20">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Send us a Message
          </h2>
          <p className="text-gray-600 mt-2">
            We would love to hear from you!
          </p>
        </div>

        {/* Form */}
        <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              placeholder="Enter Name*"
              className="w-full px-4 py-3 border rounded-lg 
                         focus:ring-1 focus:ring-black-400 outline-none"
            />
            <input
              type="email"
              placeholder="Enter Email*"
              className="w-full px-4 py-3 border rounded-lg 
                         focus:ring-1 focus:ring-black-400 outline-none"
            />
            <input
              type="tel"
              placeholder="Enter phone number*"
              className="w-full px-4 py-3 border rounded-lg 
                         focus:ring-1 focus:ring-black-400 outline-none"
            />
          </div>

          <textarea
            rows="4"
            placeholder="Your message (optional)"
            className="w-full px-4 py-3 border rounded-lg 
                       focus:ring-1 focus:ring-black-400 outline-none resize"
          ></textarea>

          {/* Submit Button */}
          <div className="text-center">
            {/* <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold
                         rounded-full bg-gradient-to-r from-purple-600 to-blue-600
                         hover:scale-105 transition-transform shadow-lg"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </button> */}
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold
                         rounded-full bg-gradient-to-r from-gray-600 to-gray-600
                         hover:scale-105 transition-transform shadow-lg"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Message
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default ContactPage;
