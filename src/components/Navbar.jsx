import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {logoutUser} from "../utils/logout"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faBook,
  faUserGraduate,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  // const activityId = authUser.activityId
  
  const handleLogout = async () => {
    // if (authUser?.activityId) {
        await logoutUser();
      // }   
   localStorage.removeItem("authUser");
    localStorage.removeItem("token");
    navigate("/", { replace: true });
    
};





  const navItems = [
    { name: "Maths Competition Details", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Registration", path: "/maths-competetion-registration" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1F2937] shadow-lg">
      <div className="flex items-center justify-between h-20 px-6 md:px-12">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-36 md:w-40" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-[#F2FFFF] text-lg relative">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onMouseEnter={() => setShowMore(false)}
              className={({ isActive }) =>
                `px-3 py-2 rounded transition-all duration-300
                ${
                  isActive
                    ? "bg-[#4F39F6] scale-105"
                    : "hover:bg-purple-800 hover:scale-105"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* MORE DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setShowMore(true)}
            onMouseLeave={() => setShowMore(false)}
          >
            <span className="px-3 py-2 cursor-pointer rounded hover:bg-purple-800 transition-all">
              More
            </span>

            {showMore && (
              <div className="absolute top-10 right-0 w-72 bg-[#111827] rounded-xl shadow-2xl p-4 animate-fadeIn z-50">
                <NavLink
                  to="/books"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  <FontAwesomeIcon icon={faBook} className="text-purple-400" />
                  <span>Books</span>
                </NavLink>

                <NavLink
                  to="/stu-fb"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    className="text-purple-400"
                  />
                  <span>Student Feedback</span>
                </NavLink>

                <NavLink
                  to="/parent-fb"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  <FontAwesomeIcon icon={faUsers} className="text-purple-400" />
                  <span>Parent Feedback</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* LOGIN / LOGOUT */}
          {authUser ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition font-bold"
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
        ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col bg-[#111827] text-white px-2 py-2 gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="px-2 py-3 rounded hover:bg-purple-800"
            >
              {item.name}
            </NavLink>
          ))}

          <NavLink
            to="/books"
            onClick={() => setOpen(false)}
            className="px-2 py-3 rounded hover:bg-purple-800"
          >
            Books
          </NavLink>

          <NavLink
            to="/student-feedback"
            onClick={() => setOpen(false)}
            className="px-2 py-3 rounded hover:bg-purple-800"
          >
            Student Feedback
          </NavLink>

          <NavLink
            to="/parent-feedback"
            onClick={() => setOpen(false)}
            className="px-2 py-3 rounded hover:bg-purple-800"
          >
            Parent Feedback
          </NavLink>

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
