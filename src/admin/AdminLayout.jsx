import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./dashboard";
import AdminStudent from "./adminStudent";
import AdminExamSched from "./adminExamSch";
import AdminParentTest from "./adminParentTest";
import AdminStuTest from "./adminStuTest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderComponent = () => {
    switch (activeTab) {
      case "students":
        return <AdminStudent />;
      case "exam":
        return <AdminExamSched />;
      case "parent":
        return <AdminParentTest />;
      case "student":
        return <AdminStuTest />;
      default:
        return <Dashboard />;
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
        <Sidebar
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
          <h1 className="ml-4 font-bold text-lg">Admin Dashboard</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {renderComponent()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
