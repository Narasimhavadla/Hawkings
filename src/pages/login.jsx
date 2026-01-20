import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      const { token, user } = res.data;
      const loginTime = new Date().toISOString();

      // Store JWT + user info
      localStorage.setItem("token", token);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role,
          loginTime
        })
      );

      const activities =
      JSON.parse(localStorage.getItem("userActivities")) || [];

    activities.push({
      username: user.username,
      role: user.role,
      loginTime,
      logoutTime: null
    });
    localStorage.setItem(
      "userActivities",
      JSON.stringify(activities)
    );

      // Role-based redirect
      if (user.role === "superadmin" || user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 
                    flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-indigo-700">
            Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to access dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
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
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-11 border rounded-lg pl-10 pr-3
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 border rounded-lg pl-10 pr-10
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold rounded-lg mb-12 mt-4
              ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
              active:scale-95 transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

       

      </div>
    </div>
  );
}
