import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { logoutUser } from "../utils/logout";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faBook,
  faUserGraduate,
  faUsers,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  let timeout;

  const navigate = useNavigate();
const [authUser, setAuthUser] = useState(
  JSON.parse(localStorage.getItem("authUser"))
);

  /* ================= LOGOUT ================= */
const handleLogout = async () => {
  await logoutUser();

  localStorage.removeItem("authUser");
  localStorage.removeItem("token");

  setAuthUser(null); // update navbar instantly

  navigate("/", { replace: true });
};



  /* ================= NAV ITEMS ================= */
  const navItems = [
    { name: "Maths Competition Details", path: "/" },
    { name: "Registration", path: "/maths-competetion-registration" },
    { name: "About Us", path: "/aboutus" },
    { name: "Contact", path: "/contact" }
  ];

  const moreItems = [
    { name: "Books", path: "/books", icon: faBook },
    { name: "Student Feedback", path: "/stu-fb", icon: faUserGraduate },
    { name: "Parent Feedback", path: "/parent-fb", icon: faUsers }
  ];

 useEffect(() => {
  const syncAuth = () => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setAuthUser(user);
  };

  window.addEventListener("storage", syncAuth);

  // 👇 also run once on mount
  syncAuth();

  return () => {
    window.removeEventListener("storage", syncAuth);
  };
}, []);


  return (
    <nav className="sticky top-0 z-50 bg-[#1F2937]/95 backdrop-blur shadow-lg">
      
      {/* ================= TOP BAR ================= */}
      <div className="flex items-center justify-between h-16 px-6 md:px-12">
        
        {/* LOGO */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-36 md:w-40" />
        </NavLink>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6 text-[#F2FFFF] text-[15px] relative">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "bg-[#4F39F6] font-semibold"
                    : "hover:bg-[#4F39F6]/80"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* ===== MORE DROPDOWN (DESKTOP) ===== */}
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(timeout);
              setShowMore(true);
            }}
            onMouseLeave={() => {
              timeout = setTimeout(() => {
                setShowMore(false);
              }, 200);
            }}
          >
            {/* Trigger */}
            <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[#4F39F6]/80 transition">
              More
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`text-xs transition-transform duration-300 ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-3 w-72 origin-top transition-all duration-300
              ${
                showMore
                  ? "opacity-100 scale-100 translate-y-0 visible"
                  : "opacity-0 scale-95 -translate-y-2 invisible"
              }`}
            >
              {/* Arrow */}
              <div className="absolute -top-2 right-6 w-4 h-4 bg-[#111827] rotate-45"></div>

              {/* Card */}
              <div className="bg-[#111827]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 space-y-1">
                
                {moreItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#4F39F6]/80 transition-all duration-200 group"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-purple-400 group-hover:scale-110 transition"
                    />
                    <span>{item.name}</span>
                  </NavLink>
                ))}

              </div>
            </div>
          </div>

          {/* LOGIN / LOGOUT */}
          {authUser ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500
        ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col bg-[#111827] text-white px-3 py-3 gap-2">

          {/* MAIN LINKS */}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg hover:bg-[#4F39F6]/80 transition"
            >
              {item.name}
            </NavLink>
          ))}

          {/* ===== MOBILE MORE ACCORDION ===== */}
          <div className="flex flex-col">

            {/* Trigger */}
            <button
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[#4F39F6]/80 transition"
            >
              <span>More</span>

              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform duration-300 ${
                  mobileMoreOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            <div
              className={`flex flex-col ml-4 overflow-hidden transition-all duration-300
              ${
                mobileMoreOpen
                  ? "max-h-60 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              {moreItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setOpen(false);
                    setMobileMoreOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* LOGIN / LOGOUT */}
          {authUser ? (
            <button
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
              className="px-4 py-3 bg-red-600 rounded-lg mt-2"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-3 bg-green-600 rounded-lg mt-2"
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
