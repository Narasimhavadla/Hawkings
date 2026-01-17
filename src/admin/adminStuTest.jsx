import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import AddStudentTestimonialModal from "../components/AddStuTestModal";
import EditStudentTestimonialModal from "../components/EditStuTestModal";
import DeleteConfirmModal from "../components/DelStuTestModal";

function AdminStuTest() {
//   const [data, setData] = useState([]); // API data
  const data = [
    {
        id : 1,
        name : "kishore",
        content : "usefull",
        rating : 4
        
    }
  ]


  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="p-4 md:p-6">
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
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Content</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
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
                        setSelected(item);
                        setShowDelete(true);
                      }}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FontAwesomeIcon icon={faTrash} />
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
        onSubmit={(d) => console.log("ADD", d)}
      />

      <EditStudentTestimonialModal
        isOpen={showEdit}
        data={selected}
        onClose={() => setShowEdit(false)}
        onSubmit={(d) => console.log("EDIT", d)}
      />

      <DeleteConfirmModal
        isOpen={showDelete}
        title="Delete Student Testimonial?"
        description="This action cannot be undone."
        onClose={() => setShowDelete(false)}
        onConfirm={() => console.log("DELETE", selected)}
      />
    </div>
  );
}

export default AdminStuTest;
