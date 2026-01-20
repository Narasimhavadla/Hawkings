// function AddAdmin(){
//     return (
//         <div>
//             <h1>This is Super Admin page Add Admin Feature</h1>
//         </div>
//     )
// }

// export default AddAdmin

import { useState } from "react";
import axios from "axios";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/v1/register",
        formData,
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      setMessage(res.data.message || "Admin added successfully");

      setFormData({
        username: "",
        password: "",
        role: "admin",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add New Admin
      </h2>

      {message && (
        <div className="mb-4 text-green-700 bg-green-100 px-4 py-2 rounded">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 text-red-700 bg-red-100 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Adding..." : "Add Admin"}
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
