export default async function RazorpayCheckout({
  amount,
  examName,
  teacherId,
  examId,
  discountApplied = 0,
  onSuccess,
}) {
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
  if (!loaded) return alert("Razorpay SDK failed to load");

  try {
    // CREATE ORDER
    const res = await fetch("http://localhost:3000/api/v1/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const orderData = await res.json();
    if (!orderData.success) return alert("Order creation failed");

    const options = {
      key: "rzp_test_S8sJNP1bvQjOn8", // Replace with your key
      amount: orderData.order.amount,
      currency: "INR",
      name: "Hawking Maths Olympiad",
      description: examName,
      order_id: orderData.order.id,
      teacherId : teacherId, //// new line i just added
      handler: async function (response) {
        try {
          const verifyRes = await fetch("http://localhost:3000/api/v1/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
              teacherId,
              examId,
              discountApplied,
            }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyData.success) return alert("Payment verification failed");

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
