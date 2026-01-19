import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";


const API_URL = "http://localhost:3000/students";

function EditStudentModal({ onClose, student, refresh }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    class: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    institute: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (student) {
    setForm({ ...student }); // ✅ COPY FULL OBJECT
  }
}, [student])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      await axios.put(`${API_URL}/${student.id}`, {
        ...form,
        id : form.id
      });
      //     setTimeout(() => {
      //   toast.success("Updated Successfully 🎉");
      // }, 2000);

      refresh();
      onClose();
        toast.success("Updated Successfully 🎉");

    } catch (error) {
      console.error(error);
      // alert("Failed to update student");
      toast.error("Failed to Updated")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white w-[95%] max-w-5xl rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Edit Student</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid md:grid-cols-3 gap-4">
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="class" value={form.class} onChange={handleChange} />
          <input name="email" value={form.email} onChange={handleChange} />
          <input name="phone" value={form.phone} onChange={handleChange} />
          <input name="state" value={form.state} onChange={handleChange} />
          <input name="city" value={form.city} onChange={handleChange} />
          <input name="institute" value={form.institute} onChange={handleChange} />
          <input name="status" value={form.status} onChange={handleChange} />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-6 py-4 border-t">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditStudentModal;
