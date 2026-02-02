import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faUser,
  faLock,
  faCrown,
  faPlusCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
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

      const res = await axios.post(
        "http://localhost:3000/api/v1/register",
        formData
      );

      setMessage(res.data.message || "Admin added successfully");

      setFormData({
        username: "",
        password: "",
        role: "",
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
    <div className="min-h-3/4 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center gap-3">
          <FontAwesomeIcon
            icon={faUserShield}
            className="text-white text-2xl"
          />
          <div>
            <h2 className="text-xl font-bold text-white">Add New Admin</h2>
            <p className="text-blue-100 text-sm">
              Create admin or super admin account
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {message && (
            <div className="mb-4 flex items-center gap-2 text-green-700 bg-green-100 px-4 py-3 rounded-lg">
              <FontAwesomeIcon icon={faPlusCircle} /> {message}
            </div>
          )}

          {error && (
            <div className="mb-4 text-red-700 bg-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Role
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faCrown}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Adding...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlusCircle} /> Add Admin
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;