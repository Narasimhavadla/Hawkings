import axios from "axios";

function RazorpayPayment() {
  const handlePayment = async () => {
    try {
      const { data: order } = await axios.post(
        "http://localhost:3000/api/v1/create-order",
        { amount: 1 }
      );

      const options = {
        key: "rzp_test_vOZUvDyrjBiM7a",
        amount: order.amount,
        currency: "INR",
        name: "My Website",
        description: "UPI Test Payment",
        order_id: order.id,

        method: {
          upi: true,
        },

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
            alert("❌ Verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err.response?.data || err);
      alert("Something went wrong");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Pay ₹1 via UPI
    </button>
  );
}

export default RazorpayPayment;
