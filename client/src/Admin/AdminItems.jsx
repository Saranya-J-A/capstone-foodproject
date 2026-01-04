import { useEffect, useState } from "react";
import api from "../api/api";
import { Trash2, Edit } from "lucide-react";

export default function AdminItems() {
  const [items, setItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [itemsRes, restaurantsRes] = await Promise.all([
        api.get("/admin/items"),
        api.get("/admin/restaurants"),
      ]);

      setItems(itemsRes?.data?.items || []);
      setRestaurants(restaurantsRes?.data?.restaurants || []);
      setLoading(false);
    } catch (err) {
      console.log("Error loading data:", err);
      setError(true);
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/admin/items/${id}`);
      setItems(items.filter((i) => i._id !== id));
    } catch (err) {
      alert("Failed to delete item.");
      console.log(err);
    }
  };

  if (loading) return <p className="text-white p-6">Loading...</p>;

  if (error)
    return (
      <p className="text-red-500 p-6 text-xl">
        Failed to load items or restaurants.
      </p>
    );

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold text-yellow-400 mb-4">All Items</h1>

      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-gray-800 rounded p-4">
            {/* Cloudinary image loading */}
            <img
              src={item.image}
              alt={item.name}
              className="rounded w-full h-40 object-cover mb-3"
            />

            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-sm text-gray-400">{item.description}</p>

            <p className="mt-2 text-yellow-400 font-bold">₹{item.price}</p>

            {/* Restaurant name */}
            <p className="text-gray-300 text-sm">
              Restaurant: {item?.restaurant?.name || "Unknown"}
            </p>

            <div className="flex gap-3 mt-3">
              <button className="bg-blue-500 px-2 py-1 rounded flex items-center gap-1">
                <Edit size={16} /> Edit
              </button>

              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 px-2 py-1 rounded flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
