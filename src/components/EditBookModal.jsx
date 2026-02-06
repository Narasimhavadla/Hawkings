import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faImage,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


export default function EditBookModal({
  book,
  onClose,
  onUpdated,
}) {
  const api = import.meta.env.VITE_API_BASE_URL;
  const domainApi = import.meta.env.VITE_API_DOMAIN
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    bookName: book?.bookName || "",
    description: book?.description || "",
    price: book?.price || "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    book?.image
      ? `${domainApi}/uploads/books/${book.image}`
      : null
  );

  const [loading, setLoading] = useState(false);

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ---------------- IMAGE CHANGE ---------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("bookName", form.bookName);
      formData.append("description", form.description);
      formData.append("price", form.price);

      if (image) formData.append("image", image);

      const res = await axios.put(
        `${api}/books/${book.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdated(res.data.data);
      toast.success("Edit succesfully")
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-2 ">

      {/* MODAL */}
        <div className="h-[90vh] w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fadeIn flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-2 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-xl font-semibold">
            Edit Book Details
          </h2>

          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 rounded-full transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-4 grid lg:grid-cols-2 gap-6"
        >
          {/* BOOK NAME */}
          <div className="col-span-2">
            <label className="text-sm font-medium">
              Book Name
            </label>
            <input
              type="text"
              name="bookName"
              value={form.bookName}
              onChange={handleChange}
              placeholder="Enter book name"
              className="w-full mt-1 border px-4 py-1 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* PRICE */}
          <div>
            <label className="text-sm font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="₹ Price"
              className="w-full mt-1 border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="text-sm font-medium">
              Upload Image
            </label>

            <label className="mt-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl h-28 cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">

              {preview ? (
                <>
                  <img
                    src={preview}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition">
                    Change Image
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="text-2xl mb-1"
                  />
                  <p className="text-sm">
                    Click to upload
                  </p>
                </div>
              )}

              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label className="text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Enter book description..."
              className="w-full mt-1 border px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* ACTIONS */}
          <div className="col-span-2 flex justify-end gap-3 pt-2 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:scale-105 transition flex items-center gap-2"
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {loading ? "Updating..." : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
