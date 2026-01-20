import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faStar,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import EditParentTestimonialModal from "../components/EditParentTestModal";
import DeleteParentTestimonialModal from "../components/DeleteParentTestModal";
import AddParentTestimonialModal from "../components/AddParentTestModal";

// const API_URL = "http://localhost:3000/api/v1/parent-testinomials"; 
// 🔼 change this to your actual endpoint

function AdminParentTest() {
  /* ------------------ STATE ------------------ */
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const [showEditTestModal, setShowEditTestModal] = useState(false);
  const [showDelTestModal, setShowDelModal] = useState(false);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [selectTestimonial,setSelectTestimonial] = useState(null)
  const [selectTestId,setSelectTestId] = useState(null)

  /* ------------------ FETCH DATA ------------------ */
 const fetchTestimonials = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await axios.get(
      "http://localhost:3000/api/v1/parent-testinomials"
    );

    setTestimonials(res.data.data);
  } catch (err) {
    console.error(err);
    setError("Failed to fetch parent testimonials");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchTestimonials();
}, []);


  /* ------------------ FILTER ------------------ */
  const filteredData = useMemo(() => {
    return testimonials.filter((t) =>
      Object.values(t)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, testimonials]);

  /* ------------------ PAGINATION ------------------ */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search testimonials..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-full lg:w-64 focus:ring focus:outline-none"
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span>Items per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={() => setShowAddTestModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
            ADD
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="py-16 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="py-16 text-center text-red-500">{error}</div>
      ) : paginatedData.length > 0 ? (
        <div className="white rounded-xl shadow overflow-x-auto hidden md:block">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Content</th>
                <th className="p-2 text-left">Rating</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 border-t">
                  <td className="p-2 font-medium">{t.name}</td>
                  <td className="p-2 text-gray-600">{t.content}</td>
                  <td className="p-2">
                    <div className="flex gap-1 text-yellow-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} />
                      ))}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-3">
                      <button
                        className="text-indigo-600 hover:text-indigo-800"
                        onClick={() => {
                          setSelectTestimonial(t)
                           setShowEditTestModal(true)
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />

                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => {setShowDelModal(true)
                          setSelectTestId(t.id)

                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-16 text-center text-gray-500">
          <p className="text-lg font-semibold">No Parent Testimonials Found</p>
          <p className="text-sm mt-1">
            Click <span className="font-semibold">ADD</span> to create one
          </p>
        </div>
      )}

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((t) => (
          <div key={t.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{t.name}</h3>
              <div className="flex gap-2">
                <button
                  className="text-indigo-600"
                  onClick={() =>{ setShowEditTestModal(true) 
                          setSelectTestimonial(t)

                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="text-red-600"
                  onClick={() => {setShowDelModal(true)
                          setSelectTestId(t.id)

                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mt-2 text-sm">{t.content}</p>

            <div className="flex gap-1 text-yellow-500 mt-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {paginatedData.length > 0 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              &lt;
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {showEditTestModal && (
        <EditParentTestimonialModal
        testimonial = {selectTestimonial}
        onClose={() => setShowEditTestModal(false)} 
        refresh={fetchTestimonials}
        
        />
      )}
      {showDelTestModal && (
        <DeleteParentTestimonialModal
        selectTestId = {selectTestId}
        onClose={() => setShowDelModal(false)} 
        refresh = {fetchTestimonials}/>
      )}
      {showAddTestModal && (
        <AddParentTestimonialModal 
        onClose={() => setShowAddTestModal(false)} 
        refresh={fetchTestimonials}
        />
      )}
    </div>
  );
}

export default AdminParentTest;
