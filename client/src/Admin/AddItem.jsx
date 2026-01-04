import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AddItem() {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Drinks",
    "Biriyani",
    "Icecreams",
    "Burger",
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    restaurantId: "",
    imageUrl: "",
  });

  useEffect(() => {
    api.get("/admin/restaurants").then((res) => {
      setRestaurants(res.data.restaurants || []);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("price", form.price);
    fd.append("category", form.category);
    fd.append("restaurantId", form.restaurantId);
    fd.append("imageUrl", form.imageUrl);

    try {
      await api.post("/admin/items", fd);

      alert("Item Added Successfully!");
      navigate("/admin/items");
    } catch (err) {
      console.log("Error adding item:", err);
      alert("Failed to add item");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Add New Item</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-gray-800 p-5 rounded"
      >
        {/* ITEM NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="p-2 bg-gray-700 rounded"
          required
        />

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 bg-gray-700 rounded"
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 bg-gray-700 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* RESTAURANT SELECT */}
        <select
          name="restaurantId"
          value={form.restaurantId}
          onChange={handleChange}
          className="p-2 bg-gray-700 rounded"
          required
        >
          <option value="">Select Restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 bg-gray-700 rounded col-span-2"
        />

        {/* IMAGE URL */}
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="p-2 bg-gray-700 col-span-2 rounded"
          placeholder="Paste Image URL"
          required
        />

        {/* SUBMIT */}
        <button className="col-span-2 bg-yellow-500 font-bold py-2 rounded">
          Add Item
        </button>
      </form>
    </div>
  );
}
