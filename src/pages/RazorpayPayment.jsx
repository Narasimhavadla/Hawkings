import axios from "axios";

function RazorpayPayment() {
  const handlePayment = async () => {
    try {
      const { data: order } = await axios.post(
        "http://localhost:3000/api/v1/create-order",
        { amount: 1 }
      );

      const options = {
        key: "rzp_test_S8sJNP1bvQjOn8",
        amount: order.amount,
        currency: "INR",
        name: "Hawkings Maths Olympiad",
        description: "₹1 Test Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await axios.post(
            "http://localhost:3000/api/v1/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: 1,
            }
          );

          if (verifyRes.data.success) {
            alert("✅ Payment Successful");
          } else {
            alert("❌ Payment Verification Failed");
          }
        },

        prefill: {
          name: "Test Student",
          email: "test@student.com",
          contact: "9999999999",
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 hover:bg-indigo-700 text-white 
                 px-6 py-3 rounded-xl font-semibold shadow-lg"
    >
      Pay ₹1 (Test Payment)
    </button>
  );
}

export default RazorpayPayment;
