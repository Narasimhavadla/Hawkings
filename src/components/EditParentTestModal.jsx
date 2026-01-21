import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/v1/parent-testinomials";

function EditParentTestimonialModal({
  onClose,
  testimonial,
  refresh,
}) {
  console.log(testimonial)
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    content: testimonial?.content || "",
    rating: testimonial?.rating || 5,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ------------------ UPDATE ------------------ */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(`${API_URL}/${testimonial.id}`, {
        name: formData.name,
        content: formData.content,
        rating: formData.rating,
      });
      toast.success("Edited Succesfully")
      refresh(); // 🔥 refresh list
      onClose();
    } catch (error) {
      console.error("Update failed:", error.response || error.message);
      // alert("Failed to update testimonial");
      toast.error("Failed to Delete")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-[92%] max-w-xl rounded-2xl shadow-2xl animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Edit Parent Testimonial</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Parent Name */}
          <div className="relative">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
              Parent Name *
            </label>
          </div>

          {/* Content */}
          <div className="relative">
            <textarea
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleChange}
              className="peer w-full border rounded-lg px-3 pt-5 pb-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder=" "
            />
            <label className="absolute left-3 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
              Testimonial Content *
            </label>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, rating: r })
                  }
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`text-xl ${
                      r <= formData.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleUpdate}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditParentTestimonialModal;
