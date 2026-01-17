import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Maths Competition Details", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Registration", path: "/maths-competetion-registration" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1F2937] shadow-lg">
      <div className="flex items-center justify-between h-20 px-6 md:px-12">

        <img src={logo} alt="Logo" className="w-36 md:w-40" />

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
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col bg-[#111827] text-white px-6 py-4 gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-left px-4 py-3 rounded transition-all duration-300
                ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
