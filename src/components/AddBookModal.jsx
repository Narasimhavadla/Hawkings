import { useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function AddBookModal({ onClose, onAdded }) {
  const api = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    bookName: "",
    description: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("bookName", form.bookName);
    data.append("description", form.description);
    data.append("price", form.price);
    if (form.image) data.append("image", form.image);

    try {
      const res = await axios.post(`${api}/books`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onAdded(res.data.data);
      toast.success("Created Succesfully")
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold">Add New Book</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="text"
            name="bookName"
            placeholder="Book Name"
            className="w-full border rounded-xl px-3 py-2"
            required
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border rounded-xl px-3 py-2"
            rows="3"
            required
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full border rounded-xl px-3 py-2"
            required
            onChange={handleChange}
          />

          {/* Image Upload */}
          <label className="block border-dashed border-2 rounded-xl p-4 text-center cursor-pointer">
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Upload Book Image
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </label>

          {preview && (
            <img
              src={preview}
              className="h-32 w-full object-cover rounded-xl"
            />
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
            >
              {loading ? "Saving..." : "Add Book"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded-xl hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
