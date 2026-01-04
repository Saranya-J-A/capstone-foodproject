import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      alert("Invalid payment session");
      navigate("/cart");
      return;
    }

    const verifyPayment = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const res = await api.get(
          `/payment/verify-checkout-session?session_id=${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (res.data.success) {
          clearCart(); // frontend cart clear
          alert("Order placed successfully ✅");
          navigate("/");
        } else {
          alert("Payment verification failed");
          navigate("/cart");
        }
      } catch (err) {
        console.error(err);
        alert("Payment verification failed");
        navigate("/cart");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="p-10 text-center text-xl">
      Verifying payment...
    </div>
  );
};

export default PaymentSuccess;
