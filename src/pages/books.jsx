import { useState } from "react";

const booksData = [
  {
    id: 1,
    title: "Mathematics Olympiad Level 1",
    author: "Maths Academy",
    price: 299,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qkfVPgI0iH1EH682_PdmIf9M5XvWXsJ2dA&s",
    description: "Covers fundamentals and practice questions for Class 5–6."
  },
  {
    id: 2,
    title: "Advanced Olympiad Problems",
    author: "Maths Academy",
    price: 399,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt72-Jpv1D4zJzb_1AdqdlwaiO68sYUmYTjw&s",
    description: "High-level problems for competitive exams (Class 7–9)."
  },
  {
    id: 3,
    title: "Speed Maths Workbook",
    author: "Expert Faculty",
    price: 249,
    image: "https://www.shutterstock.com/image-photo/book-open-pages-close-up-600nw-2562942291.jpg",
    description: "Improve calculation speed with tricks and practice sets."
  }
];

export default function Books() {
  const [loadingId, setLoadingId] = useState(null);

  const handleOrder = (book) => {
    setLoadingId(book.id);

    // 🔗 Later you can connect Razorpay / Checkout here
    setTimeout(() => {
      alert(`Order placed for "${book.title}"`);
      setLoadingId(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Our Books</h1>
          <p className="mt-2 text-gray-600">
            Browse and order study materials curated by expert faculty
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {booksData.map((book) => (
            <div
              key={book.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl"
            >
              {/* Image */}
              <img
                src={book.image}
            

                alt={book.title}
                className="h-56 w-full object-cover"
              />

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-bold text-gray-800">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-500">
                  by {book.author}
                </p>

                <p className="mt-3 flex-1 text-sm text-gray-600">
                  {book.description}
                </p>

                {/* Price & Action */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{book.price}
                  </span>

                  <button
                    onClick={() => handleOrder(book)}
                    disabled={loadingId === book.id}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loadingId === book.id ? "Processing..." : "Order Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-sm text-gray-500">
          📦 Delivery available across India · 💳 Secure payment
        </p>
      </div>
    </div>
  );
}
