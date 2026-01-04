import { useRef } from "react";
import api from "../api/api";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useCart();
  const paymentStarted = useRef(false);

  const handlePayment = async () => {
    if (!cart || cart.length === 0) {
      alert("Cart empty");
      return;
    }

    if (paymentStarted.current) return;
    paymentStarted.current = true;

    try {
      //  GET TOKEN CORRECTLY
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        paymentStarted.current = false;
        return;
      }

      const res = await api.post(
        "/payment/create-checkout-session",
        { cart },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      //  STRIPE RETURNS URL
      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("Stripe URL missing");
      }

    } catch (err) {
      console.error("PAYMENT ERROR:", err.response?.data || err.message);
      paymentStarted.current = false;
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Pay with Stripe
      </button>
    </div>
  );
};

export default Checkout;
