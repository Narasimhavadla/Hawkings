
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faStar,
   faArrowUpRightFromSquare,
  faLinkSlash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import AddStudentTestimonialModal from "../components/AddStuTestModal";
import EditStudentTestimonialModal from "../components/EditStuTestModal";
import DeleteConfirmModal from "../components/DelStuTestModal";

const API_URL = "http://localhost:3000/api/v1/student-testinomials"; 

function AdminStuTest() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selected, setSelected] = useState(null);
  const [selectIdDel,setSelectIdDel] = useState(null)
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectTest,setSelectTest] = useState(null)

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(API_URL);

      setData(res.data.data || res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const togglePublish = async (id) => {
    try {
      await axios.patch(`${API_URL}/${id}/toggle`);
      toast.success("Status updated");
      fetchTestimonials();
    } catch (err) {
      if (err.response?.status === 400) {
        toast.warning("Only 4 student testimonials can be displayed");
      } else {
        toast.error("Failed to update status");
      }
    }
  };

  return (
    <div className="p-3 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Student Testimonials</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700"
        >
          <FontAwesomeIcon icon={faPlus} />
          ADD
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto ">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Content</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-20 text-center text-gray-400">
                  Loading testimonials...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="py-20 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-20 text-center text-gray-400">
                  No Student Testimonials Found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{item.name}</td>

                  <td className="p-3">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <FontAwesomeIcon
                          key={r}
                          icon={faStar}
                          className={
                            r <= item.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </td>

                  <td className="p-3 max-w-sm truncate">
                    {item.content}
                  </td>

                  <td className="p-3 text-center space-x-3">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setShowEdit(true);
                      }}
                      className="text-indigo-600 hover:scale-110 transition"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectIdDel(item.id);
                        setShowDelete(true);
                      }}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button 
                        className={`${
                          item.isPublished
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                        onClick={() => togglePublish(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={
                            item.isPublished
                              ? faLinkSlash
                              : faArrowUpRightFromSquare
                          }
                        />
                      </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddStudentTestimonialModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSuccess={fetchTestimonials} // 🔥 refresh after add
      />

      <EditStudentTestimonialModal
        isOpen={showEdit}
        data={selected}
        onClose={() => setShowEdit(false)}
        onSuccess={fetchTestimonials} // 🔥 refresh after edit
      />

     <DeleteConfirmModal
        isOpen={showDelete}
        testimonialId={selectIdDel}
        onClose={() => setShowDelete(false)}
        onSuccess={fetchTestimonials}
      />


    </div>
  );
}

export default AdminStuTest;
