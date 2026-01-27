import { useState } from "react";

export default function StudentFeedBack() {
  const [form, setForm] = useState({
    name: "",
    content: "",
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setForm({ ...form, rating: value });
  };

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
        "http://localhost:3000/api/v1/student-testinomials",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            content: form.content,
            rating: form.rating,
            // ❌ isPublished NOT sent (default false in backend)
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit feedback");
      }

      setSuccess("Thank you! Your feedback has been submitted for review.");
      setForm({ name: "", content: "", rating: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-lg md:p-8">
        {/* Header */}
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Student Feedback
          </h1>
          <p className="mt-2 text-gray-600">
            Share your experience to help us improve
          </p>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-xl border px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Feedback */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="4"
              placeholder="Write your valuable feedback here..."
              className="w-full resize-none rounded-xl border px-4 py-2 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`text-3xl transition ${
                    star <= form.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

          {/* Info */}
          <p className="text-center text-xs text-gray-500">
            Your feedback will be reviewed before being published.
          </p>
        </form>
      </div>
    </div>
  );
}
