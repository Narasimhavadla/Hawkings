import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faStar,
  faUser,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

function AddParentTestimonialModal({
    //  isOpen,
      onClose,
    //    onSubmit 
    }) {
//   if (!isOpen) return null;

//   const [formData, setFormData] = useState({
//     name: "",
//     content: "",
//     rating: 0,
//   });

//   const [hoverRating, setHoverRating] = useState(0);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     if (!formData.name || !formData.content || !formData.rating) return;
//     onSubmit(formData);
//     setFormData({ name: "", content: "", rating: 0 });
//     onClose();
//   };

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
          <h2 className="text-lg font-semibold">
            Add Parent Testimonial
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700"
          >
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Parent Name */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute left-3 top-4 text-gray-400"
            />
            <input
              name="name"
            //   value={formData.name}
            //   onChange={handleChange}
              className="peer w-full border rounded-lg pl-10 pr-3 pt-5 pb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder=" "
            />
            <label className="absolute left-10 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
              Parent Name *
            </label>
          </div>

          {/* Content */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faMessage}
              className="absolute left-3 top-4 text-gray-400"
            />
            <textarea
              name="content"
              rows={4}
            //   value={formData.content}
            //   onChange={handleChange}
              className="peer w-full border rounded-lg pl-10 pr-3 pt-5 pb-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              placeholder=" "
            />
            <label className="absolute left-10 top-2 text-sm text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
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
                  onMouseEnter={() => setHoverRating(r)}
                  onMouseLeave={() => setHoverRating(0)}
                //   onClick={() =>
                //     setFormData({ ...formData, rating: r })
                //   }
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    // className={`text-2xl transition ${
                    //   r <= (hoverRating || formData.rating)
                    //     ? "text-yellow-400 scale-110"
                    //     : "text-gray-300"
                    // }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            // onClick={handleSubmit}
            // disabled={!formData.name || !formData.content || !formData.rating}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Testimonial
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddParentTestimonialModal;
