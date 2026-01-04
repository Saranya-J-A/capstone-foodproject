import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  //  ONLY NAVIGATION HERE
  const handleCheckout = () => {
  const token = localStorage.getItem("token"); 

  if (!token) {
    navigate("/login?redirect=checkout");
    return;
  }

  navigate("/checkout");
};



  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Your cart is empty 🛒
        </h2>
        <button
          onClick={() => navigate("/restaurants")}
          className="bg-yellow-500 px-6 py-2 rounded"
        >
          Browse Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="bg-white rounded shadow p-4 mb-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b py-3"
          >
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xl font-bold mb-6">
        <span>Total</span>
        <span>₹{total}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={clearCart}
          className="w-1/2 bg-red-500 text-white py-3 rounded"
        >
          Clear Cart
        </button>

        <button
          onClick={handleCheckout}
          className="w-1/2 bg-green-600 text-white py-3 rounded"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
