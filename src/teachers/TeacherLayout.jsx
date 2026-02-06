import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Books from "../pages/books";



// 🧩 Teacher Pages
import TeacherDashboard from "./dashboard";
import TeacherStudents from "./TeacherStudents";
import TeacherBulkUpload from "./TeacherBulkUpload";
import TeacherPayment from "./TeacherPayment";
import TeacherSidebar from "./TeacherSidebar";
import TeacherReffer from "./TeacherReffer";

const TeacherLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const token = localStorage.getItem("token");

  /* 🔐 AUTH + ROLE PROTECTION */
  useEffect(() => {
    if (!authUser || !token || authUser.role !== "teacher") {
      navigate("/login", { replace: true });
    }

    // block browser back
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/login", { replace: true });
    };

    return () => {
      window.onpopstate = null;
    };
  }, [authUser, token, navigate]);

  const renderComponent = () => {
    switch (activeTab) {
      case "students":
        return <TeacherStudents />;
      case "bulkUpload":
        return <TeacherBulkUpload />;
      case "payment":
        return <TeacherPayment />;
      case "reffer":
        return <TeacherReffer />;
      case "books":
        return <Books />;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-50 h-full transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <TeacherSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center bg-white shadow px-4 py-3">
          <button onClick={() => setSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars} className="text-xl text-gray-700" />
          </button>
          <h1 className="ml-4 font-bold text-lg">Teacher Dashboard</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
