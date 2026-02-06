import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceAngry,
  faFaceFrown,
  faFaceMeh,
  faFaceSmile,
  faFaceGrinStars,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ParentFeedBack() {
  const [form, setForm] = useState({
    name: "",
    content: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const api = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  /* ================= ICON RATINGS ================= */
  const ratings = [
    {
      value: 1,
      icon: faFaceAngry,
      label: "Very Bad",
      color: "text-red-500",
    },
    {
      value: 2,
      icon: faFaceFrown,
      label: "Bad",
      color: "text-orange-500",
    },
    {
      value: 3,
      icon: faFaceMeh,
      label: "Okay",
      color: "text-yellow-500",
    },
    {
      value: 4,
      icon: faFaceSmile,
      label: "Good",
      color: "text-green-500",
    },
    {
      value: 5,
      icon: faFaceGrinStars,
      label: "Excellent",
      color: "text-indigo-600",
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setForm({ ...form, rating: value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.content || !form.rating) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${api}/parent-testinomials`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit feedback");
      }

      /* ✅ Success */
      setSuccess(
        "Thank you! Your feedback has been submitted for review."
      );

      setForm({ name: "", content: "", rating: 0 });

      /* ✅ Redirect after 2 sec */
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 py-2 flex items-center justify-center">

      {/* ================= CARD ================= */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-6 md:p-8">

        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Parent Feedback
          </h1>
          <p className="mt-1 text-gray-600 text-sm md:text-base">
            Share your experience as a parent to help us improve
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-2 rounded-lg bg-red-100 p-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-2 text-sm text-green-600 text-center">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="3"
              placeholder="Write your feedback about your child's learning experience..."
              className="w-full resize-none rounded-xl border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* ================= ICON RATING ================= */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How was your experience?
            </label>

            <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8 flex-wrap">

              {ratings.map((item) => {
                const isActive = form.rating === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleRating(item.value)}
                    className={`
                      flex flex-col items-center
                      transition-all duration-200
                      ${
                        isActive
                          ? "scale-125"
                          : "opacity-70 hover:scale-110"
                      }
                    `}
                  >
                    {/* Icon */}
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`
                        text-xl sm:text-2xl md:text-3xl
                        ${isActive ? item.color : "text-gray-400"}
                      `}
                    />

                    {/* Label */}
                    <span
                      className={`
                        text-xs mt-1 font-medium
                        ${
                          isActive
                            ? "text-indigo-600"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-indigo-600
              px-6 py-2
              font-semibold text-white
              shadow
              hover:bg-indigo-700
              active:scale-95
              transition
              disabled:opacity-60
            "
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Your feedback will be reviewed before being published.
          </p>

        </form>
      </div>
    </div>
  );
}
