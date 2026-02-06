import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const accesKey = import.meta.env.WEB3_ACCESS_KEY

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: `${accesKey}`, 
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            subject: "New Contact Message from Hawking Website",
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSuccess("Message sent successfully ✅");
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setError("Failed to send message");
      }

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Title */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Get in Touch
        </h1>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Call Us On</h3>
            <p className="text-gray-600 mt-1">90327 08639</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p className="text-gray-600 mt-1 break-all">
              support@hawkingmathsolympiad.com
            </p>
          </div>
        </div>

      </div>

      {/* Form */}
      <div className="max-w-6xl mx-auto px-6 mt-14 pb-20">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >

          {success && (
            <p className="text-green-600 text-center">
              {success}
            </p>
          )}

          {error && (
            <p className="text-red-600 text-center">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Name*"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email*"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number*"
              required
              className="w-full px-4 py-3 border rounded-lg"
            />

          </div>

          <textarea
            rows="4"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your message"
            className="w-full px-4 py-3 border rounded-lg"
          ></textarea>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold
                         rounded-full bg-gradient-to-r from-purple-600 to-blue-600
                         hover:scale-105 transition-transform shadow-lg
                         disabled:opacity-60"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ContactPage;
