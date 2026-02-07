import { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "../components/OrderModal";

export default function Books() {
  const api = import.meta.env.VITE_API_BASE_URL;
  const domainApi = import.meta.env.VITE_API_DOMAIN;
  const token = localStorage.getItem("token");

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  /* ================= FETCH BOOKS ================= */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${api}/books`);
        setBooks(res.data.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= CONTAINER ================= */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Our Books
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Browse and order study materials curated by expert faculty
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
          "
        >
          {books.map((book) => (
            <div
              key={book.id}
              className="
                flex flex-col
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                overflow-hidden
              "
            >
              {/* ================= IMAGE ================= */}
              <div className="w-full overflow-hidden">
                <img
                  src={`${domainApi}/uploads/books/${book.image}`}
                  alt={book.bookName}
                  className="
                    w-full
                    h-40 sm:h-36 md:h-40 lg:h-44 xl:h-44
                    object-cover
                    hover:scale-105
                    transition duration-300
                  "
                />
              </div>

              {/* ================= CONTENT ================= */}
              <div className="flex flex-col flex-1 p-4 sm:p-5">

                {/* Book Name */}
                <h2 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
                  {book.bookName}
                </h2>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-3">
                  {book.description}
                </p>

                {/* ================= PRICE + BUTTON ================= */}
                <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                  <span className="text-lg sm:text-xl font-bold text-indigo-600">
                    ₹{book.price}
                  </span>

                  <button
                    onClick={() => openModal(book)}
                    disabled={loadingId === book.id}
                    className="
                      w-full sm:w-auto
                      rounded-xl
                      bg-indigo-600
                      px-5 py-2.5
                      text-sm font-semibold text-white
                      shadow
                      hover:bg-indigo-700
                      active:scale-95
                      transition
                      disabled:opacity-60
                    "
                  >
                    {loadingId === book.id
                      ? "Processing..."
                      : "Order Now"}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <p className="mt-12 text-center text-xs sm:text-sm text-gray-500 px-4">
          📦 Delivery available across India · 💳 Secure payment
        </p>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <OrderModal
          book={selectedBook}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
