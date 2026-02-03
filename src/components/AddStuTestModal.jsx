import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


const api =import.meta.env.VITE_API_BASE_URL

const API_URL = `${api}/student-testinomials`

const token = localStorage.getItem("token")
// 🔁 change if needed

function AddStudentTestimonialModal({ isOpen, onClose, onSubmit,onSuccess }) {
  if (!isOpen) return null;

  const [form, setForm] = useState({
    name: "",
    content: "",
    rating: 0,
  });
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ================= POST API ================= */
  const handleAdd = async () => {
    if (!form.name || !form.content || form.rating === 0) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(API_URL, form,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      });

      toast.success("Student testimonial added successfully");

      onSubmit && onSubmit(res.data); // optional callback
      onSuccess()
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-[92%] max-w-lg rounded-2xl shadow-2xl animate-scaleIn">
        <header className="flex justify-between items-center p-5 border-b">
          <h2 className="font-semibold">Add Student Testimonial</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        <div className="p-6 space-y-4">
          <input
            placeholder="Student Name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            rows="4"
            placeholder="Testimonial Content"
            className="w-full border p-3 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <FontAwesomeIcon
                key={r}
                icon={faStar}
                onMouseEnter={() => setHover(r)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setForm({ ...form, rating: r })}
                className={`text-2xl cursor-pointer ${
                  r <= (hover || form.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <footer className="flex justify-end gap-3 p-5 border-t bg-gray-50">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default AddStudentTestimonialModal;
