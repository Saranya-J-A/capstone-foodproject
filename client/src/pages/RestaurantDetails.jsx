import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useCart } from "../context/CartContext";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get restaurant details (optional)
        const res = await api.get(`/restaurant/${id}`).catch(() => null);
        if (res) setRestaurant(res.data.restaurant);

        // Load items of that restaurant
        const itemRes = await api.get(`/item?restaurantId=${id}`);
        setItems(itemRes.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* Show restaurant name only if available */}
      {restaurant && (
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">
          {restaurant.name}
        </h1>
      )}

      <h2 className="text-2xl font-bold mb-4 text-yellow-400">Menu</h2>

      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 hover:scale-105 transition"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="h-32 w-full object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-3">{item.name}</h3>
              <p className="text-sm">{item.description}</p>
              <p className="mt-2 font-bold text-yellow-500">₹{item.price}</p>

              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;
