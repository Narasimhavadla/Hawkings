import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/landingPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./admin/AdminLayout";
import Aboutus from "./pages/aboutus";
import MathsCompReg from "./pages/mathsCompReg";
import ContactPage from "./pages/contactPage";
import Login from "./pages/login";
import TeacherLayout from "./teachers/TeacherLayout.JSX";
import Books from "./pages/books";
import StudentFeedBack from "./pages/StudentFB";
import ParentFeedBack from "./pages/TeacherFB";



function App() {
  const navigate = useNavigate();

  // 🔒 Prevent back navigation after logout
  useEffect(() => {
    const handlePopState = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () =>
      window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route
          path="/maths-competetion-registration"
          element={<MathsCompReg />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<Books />} />
        <Route path="/stu-fb" element={<StudentFeedBack />} />
        <Route path="/parent-fb" element={<ParentFeedBack />} />

        {/* 🔒 Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/teacher" element={<TeacherLayout />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
