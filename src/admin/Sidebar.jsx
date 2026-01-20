import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUserGraduate,
  faCalendarDays,
  faComments,
  faCommentDots,
  faUser,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ activeTab, setActiveTab }) => {

  // ✅ Read authUser from localStorage
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const role = authUser?.role; // "admin" | "superadmin"

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: faChartLine },
    { id: "students", label: "Students", icon: faUserGraduate },
    { id: "exam", label: "Exam Schedule", icon: faCalendarDays },
    { id: "parent", label: "Parent Testimonials", icon: faComments },
    { id: "student", label: "Student Testimonials", icon: faCommentDots },

    // ✅ Show only for SUPER ADMIN
    ...(role === "superadmin"
      ? [{ id: "AddAdmin", label: "Add Admin", icon: faUser },
        { id: "userActivity", label: "User Activity", icon: faUserGroup }
      ]
      : []),
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-full">
      <div className="p-5 text-xl font-bold border-b border-slate-700">
        Hawking <span>{role == "superadmin" ? <span className="text-red-600">Super Admin</span> : <span className="text-green-500">Admin</span>}</span>
      </div>

      <ul className="mt-4 space-y-1">
        {menu.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-6 py-3 cursor-pointer 
              transition-all hover:bg-slate-800
              ${
                activeTab === item.id
                  ? "bg-slate-800 border-l-4 border-blue-500"
                  : ""
              }`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
