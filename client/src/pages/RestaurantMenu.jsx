import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import api from "../api/api";

const RestaurantMenu = () => {
  const { id } = useParams(); // restaurantId
  const { addToCart, setCurrentRestaurant } = useCart();

  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Remember which restaurant user is ordering from
    setCurrentRestaurant(id);

    setLoading(true);

    api
      .get(`/items/restaurant/${id}`)
      .then((res) => {
        setItems(res.data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  }, [id, setCurrentRestaurant]);

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Drinks",
    "Dessert",
  ];

  const filteredItems =
    category === "All"
      ? items
      : items.filter(
          (item) =>
            item.category?.toLowerCase() === category.toLowerCase()
        );

  if (loading) return <p className="p-6">Loading menu...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* CATEGORY FILTER */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full border transition ${
              category === cat
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU ITEMS */}
      {filteredItems.length === 0 ? (
        <p>No items found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="h-32 w-full object-cover rounded"
              />

              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="font-bold mb-3">₹{item.price}</p>

              {/* ADD TO CART */}
              <button
                onClick={() => addToCart(item, id)}
                className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600 transition"
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

export default RestaurantMenu;
