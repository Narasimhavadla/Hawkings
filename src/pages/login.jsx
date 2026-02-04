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
import loginIllu from "../assets/loginIllu.svg"

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const api = import.meta.env.VITE_API_BASE_URL

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
        `${api}/login`,
        formData
      );

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          id: user.id,
          username: user.username,
          role: user.role,
          teacherId: user.teacherId || null,   
          activityId: user.activityId,
        })
      );

      if (user.role === "superadmin" || user.role === "admin" ) {
        navigate("/admin");
      } 
      else if(user.role === "teacher"){
        navigate('/teacher')
      }
      else {
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Invalid username or password"
          : "Server error. Try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Illustration Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-10">
          <img
            src={loginIllu}
            alt="Login Illustration"
            className="w-80 mb-6 animate-fadeIn"
          />
          <h2 className="text-2xl font-bold text-center">
            Welcome Back!
          </h2>
          <p className="text-indigo-100 text-center mt-2">
            Login to manage your dashboard and activities
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">

            <h1 className="text-3xl font-extrabold text-indigo-700 text-center">
              Login
            </h1>
            <p className="text-gray-500 text-center mt-1 mb-6">
              Access your account securely
            </p>

            <form onSubmit={handleLogin} className="space-y-5">

              {/* Username */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Username
                </label>
                <div className="relative mt-1">
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
                    className="w-full h-11 rounded-lg border pl-10 pr-3
                               focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-600 font-medium">
                  Password
                </label>
                <div className="relative mt-1">
                  <FontAwesomeIcon
                    icon={faLock}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full h-11 rounded-lg border pl-10 pr-10
                               focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold
                  ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }
                  transition active:scale-95`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
