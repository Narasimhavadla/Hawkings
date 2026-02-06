import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faBookOpen,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import DeleteBookModal from "../components/DeleteBookModal";
import EditBookModal from "../components/EditBookModal";
import AddBookModal from "../components/AddBookModal";

export default function Books() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);


  const [showDeleteModal, setShowDeleteModal] =
    useState(false);
  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedBook, setSelectedBook] =
    useState(null);

  const api = import.meta.env.VITE_API_BASE_URL;
  const domainApi = import.meta.env.VITE_API_DOMAIN

  const token = localStorage.getItem("token");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`${api}/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBooks(res.data.data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  /* ---------------- DELETE ---------------- */
  const handleBookDeleted = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleBookAdded = (book) => {
  setBooks((prev) => [book, ...prev]);
};


  const handleBookUpdated = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === updatedBook.id ? updatedBook : b
      )
    );
  };

  /* ---------------- FILTER ---------------- */
  const filteredBooks = books.filter((b) =>
    b.bookName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
        <h1 className="text-xl font-bold flex gap-2 items-center">
            <FontAwesomeIcon icon={faBookOpen} />
            Books Management
        </h1>

            <div className="flex gap-3">
                <input
                type="text"
                placeholder="Search..."
                className="border px-3 py-2 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />

                <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 flex gap-2 items-center"
                >
                <FontAwesomeIcon icon={faPlus} />
                Add Book
                </button>
            </div>
</div>


      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow overflow-hidden"
          >
            <img
              src={`${domainApi}/uploads/books/${book.image}`}
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-bold">
                {book.bookName}
              </h2>

              <p className="text-sm text-gray-500">
                ₹ {book.price}
              </p>

              <p className="text-sm line-clamp-2">
                {book.description}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 bg-orange-400 text-white py-1 rounded-xl"
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedBook(book);
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 bg-red-500 text-white py-1 rounded-xl"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteBookModal
          book={selectedBook}
          onClose={() =>
            setShowDeleteModal(false)
          }
          onDeleted={handleBookDeleted}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditBookModal
          book={selectedBook}
          onClose={() =>
            setShowEditModal(false)
          }
          onUpdated={handleBookUpdated}
        />
      )}

      {showAddModal && (
        <AddBookModal
            onClose={() => setShowAddModal(false)}
            onAdded={handleBookAdded}
        />
      )}


    </div>
  );
}
