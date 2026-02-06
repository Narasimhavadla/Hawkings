import { useState } from "react";
import axios from "axios";

export default function OrderModal({ book, onClose }) {
  const api = import.meta.env.VITE_API_BASE_URL;
  const domainApi = import.meta.env.VITE_API_DOMAIN;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
  });

  const [loading, setLoading] = useState(false);
  const [showSuccesCard,setShowSuccesCard] = useState(false)

  /* ------------ HANDLE INPUT ------------ */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const increaseQty = () => {
    setForm({ ...form, quantity: form.quantity + 1 });
  };

  const decreaseQty = () => {
    if (form.quantity > 1) {
      setForm({ ...form, quantity: form.quantity - 1 });
    }
  };

  const totalPrice = form.quantity * book.price;

 
  const placeOrder = async () => {
    try {
      setLoading(true);

      const payload = {
        ...form,
        bookId: book.id,
        totalPrice,
      };

      /* 1️⃣ CREATE ORDER IN BACKEND */
      const { data } = await axios.post(
        `${api}/orders/create`,
        payload
      );

      const options = {
        key: data.key,
        amount: data.razorpayOrder.amount,
        currency: "INR",
        name: "Book Store",
        description: book.bookName,
        image: `${domainApi}/uploads/books/${book.image}`,
        order_id: data.razorpayOrder.id,

        handler: async function (response) {
          await axios.post(
            `${api}/orders/verify`,
            response
          );

           setShowSuccesCard(true);
        },

        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function () {
        alert("❌ Payment Failed");
      });

    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl h-[97%] overflow-y-auto md:overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-2">
          <h2 className="text-xl font-bold">Order Book</h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="grid md:grid-cols-2 gap-6 p-6">

          {/* BOOK DETAILS */}
          <div className="rounded-xl p-2 bg-gray-50 shadow-2xl">
            <img
              src={`${domainApi}/uploads/books/${book.image}`}
              alt={book.bookName}
              className="h-36 w-full object-cover rounded-lg"
            />

            <h3 className="mt-3 font-bold text-lg">
              {book.bookName}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {book.description}
            </p>

            <p className="text-indigo-600 font-bold text-xl mt-3">
              ₹{book.price}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 rounded-lg bg-gray-200"
              >
                −
              </button>

              <span className="font-semibold">
                {form.quantity}
              </span>

              <button
                onClick={increaseQty}
                className="px-3 py-1 rounded-lg bg-gray-200"
              >
                +
              </button>
            </div>

            <p className="mt-4 font-bold">
              Total: ₹{totalPrice}
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-2">
            <input name="fullName" placeholder="Full Name" className="input" onChange={handleChange}/>
            <input name="phone" placeholder="Phone Number" className="input" onChange={handleChange}/>
            <input name="email" placeholder="Email" className="input" onChange={handleChange}/>
            <textarea name="address" placeholder="Full Address" className="input" onChange={handleChange}/>
            
            <div className="grid grid-cols-2 gap-3">
              <input name="city" placeholder="City" className="input" onChange={handleChange}/>
              <input name="state" placeholder="State" className="input" onChange={handleChange}/>
            </div>

            <input name="pincode" placeholder="Pincode" className="input" onChange={handleChange}/>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t p-2">
          <button onClick={onClose} className="px-5 py-1 rounded-xl border">
            Cancel
          </button>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="px-6 py-1 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 10px;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>


      {showSuccesCard && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6">

    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-scaleIn">

      <div className="flex justify-center">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-4xl text-green-600">✓</span>
        </div>
      </div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mt-4 text-gray-800">
        Payment Successful!
      </h2>

      {/* MESSAGE */}
      <p className="text-gray-600 mt-2">
        Thank you for your purchase 🎉  
        Your order has been placed successfully.
      </p>

      {/* ORDER INFO */}
      <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
        <p><strong>Book:</strong> {book.bookName}</p>
        <p><strong>Quantity:</strong> {form.quantity}</p>
        <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
      </div>

      {/* ACTION BUTTONS */}
        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={() => {
              setShowSuccesCard(false);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )}


    </div>


        


  );
}
