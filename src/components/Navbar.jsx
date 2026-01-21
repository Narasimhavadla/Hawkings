import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const handleLogout = () => {
    const activities =
      JSON.parse(localStorage.getItem("userActivities")) || [];

    // update logout time
    if (authUser) {
      for (let i = activities.length - 1; i >= 0; i--) {
        if (
          activities[i].username === authUser.username &&
          activities[i].logoutTime === null
        ) {
          activities[i].logoutTime = new Date().toISOString();
          break;
        }
      }

      localStorage.setItem(
        "userActivities",
        JSON.stringify(activities)
      );
    }

    localStorage.removeItem("authUser");
    localStorage.removeItem("token");

    navigate("/", { replace: true });
  };

  const navItems = [
    { name: "Maths Competition Details", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Registration", path: "/maths-competetion-registration" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1F2937] shadow-lg">
      <div className="flex items-center justify-between h-20 px-6 md:px-12">
        <a href="/">
        <img src={logo} alt="Logo" className="w-36 md:w-40" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-[#F2FFFF] text-lg">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded transition-all duration-300
                ${
                  isActive
                    ? "bg-blue-700 scale-105"
                    : "hover:bg-blue-800 hover:scale-105"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* LOGIN / LOGOUT */}
          {authUser ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition font-bold"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition font-bold"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col bg-[#111827] text-white px-6 py-4 gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded hover:bg-blue-800"
            >
              {item.name}
            </NavLink>
          ))}

          {authUser ? (
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="px-4 py-3 bg-red-600 rounded"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-3 bg-green-600 rounded"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
