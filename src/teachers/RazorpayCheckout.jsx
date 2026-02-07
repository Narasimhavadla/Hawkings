export default async function RazorpayCheckout({
  amount,
  examName,
  examId,
  discountApplied = 0,
  onSuccess,
  teacherId
}) {
  /* ================= LOAD SDK ================= */
  const loadScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-sdk")) return resolve(true);

      const script = document.createElement("script");
      script.id = "razorpay-sdk";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const loaded = await loadScript();
  if (!loaded) {
    alert("Razorpay SDK failed to load");
    return;
  }

  try {
    /* ================= CREATE ORDER ================= */
    const orderRes = await fetch(
      "http://localhost:3000/api/v1/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount }),
      }
    );

    const orderData = await orderRes.json();
    if (!orderData.success) {
      alert("Order creation failed");
      return;
    }

    /* ================= RAZORPAY OPTIONS ================= */
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // keep key in env
      amount: orderData.order.amount,
      currency: "INR",
      name: "Hawking Maths Olympiad",
      description: examName,
      order_id: orderData.order.id,
      teacherId : teacherId, //// new line i just added


      handler: async function (response) {
        try {
          /* ================= VERIFY PAYMENT ================= */
          const verifyRes = await fetch(
            "http://localhost:3000/api/v1/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                examId,
                examName,
                teacherId,
                discountApplied,
              }),
            }
          );

          const verifyData = await verifyRes.json();
          if (!verifyData.success) {
            alert("Payment verification failed");
            return;
          }

          // ✅ VERIFIED & SAVED IN DB
          onSuccess(verifyData);

        } catch (err) {
          console.error("Payment verification error:", err);
          alert("Payment verification failed");
        }
      },

      theme: { color: "#4f46e5" },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error("Razorpay checkout error:", err);
    alert("Something went wrong during payment");
  }
}
