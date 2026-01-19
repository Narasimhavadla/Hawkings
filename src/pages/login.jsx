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
      const res = await axios.get("http://localhost:3000/users", {
        params: {
          username: formData.username || "admin",
          password: formData.password || "12345",
        },
      });

      if (res.data.length === 0) {
        setError("Invalid username or password");
        setLoading(false);
        return;
      }

      const loggedInUser = res.data[0];

      // Store user info (no JWT)
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          id: loggedInUser.id,
          username: loggedInUser.username,
          role: loggedInUser.role,
        })
      );

      // Role based redirect
      if (loggedInUser.role === "superadmin" ) {
        navigate("/admin");
      } else if (loggedInUser.role === "admin" || loggedInUser.username == "admin" && loggedInUser.password == "12345") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
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
            className={`w-full py-3 text-white font-semibold rounded-lg
              ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
              active:scale-95 transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Demo Credentials */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Demo Credentials</p>
          <p className="mt-1">
            user / admin / superadmin <br />
            <span className="font-semibold">Password:</span> 12345
          </p>
        </div>

      </div>
    </div>
  );
}
