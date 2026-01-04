import { useEffect, useState } from "react";
import api from "../api/api";
import { Trash2, Edit } from "lucide-react";

const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    imageFile: null,
  });

  // Load restaurants
  useEffect(() => {
    api
      .get("/admin/restaurants")
      .then((res) => setRestaurants(res.data.restaurants || []))
      .finally(() => setLoading(false));
  }, []);

  // Submit Handler
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("description", form.description);

    // If input contains URL (string)
    if (form.image && !form.imageFile) {
      formData.append("image", form.image);
    }

    // If file is selected
    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    let res;

    if (editing) {
      // Update
      res = await api.put(`/admin/restaurants/${editing}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setRestaurants((prev) =>
        prev.map((r) =>
          r._id === editing ? res.data.restaurant : r
        )
      );
    } else {
      // Create
      res = await api.post("/admin/restaurants", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRestaurants((prev) => [...prev, res.data.restaurant]);
    }

    // Reset
    setForm({
      name: "",
      location: "",
      description: "",
      image: "",
      imageFile: null,
    });

    setEditing(null);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this restaurant?")) return;

    await api.delete(`/admin/restaurants/${id}`);
    setRestaurants((prev) => prev.filter((r) => r._id !== id));
  };

  // Edit
  const handleEdit = (r) => {
    setEditing(r._id);
    setForm({
      name: r.name,
      location: r.location,
      description: r.description,
      image: r.image,
      imageFile: null,
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-yellow-400">
        Manage Restaurants
      </h2>

      {/* Form */}
      <form onSubmit={submit} className="mb-6 grid grid-cols-2 gap-3">
        <input
          className="p-2 border rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="p-2 border rounded"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          className="p-2 border rounded col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Image URL */}
        <input
          className="p-2 border rounded col-span-2"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image: e.target.value,
              imageFile: null,
            })
          }
        />

        {/* File Upload */}
        <input
          type="file"
          accept="image/*"
          className="p-2 border rounded col-span-2"
          onChange={(e) =>
            setForm({
              ...form,
              imageFile: e.target.files[0],
              image: "",
            })
          }
        />

        <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded col-span-2">
          {editing ? "Update Restaurant" : "Add Restaurant"}
        </button>
      </form>

      {/* Restaurants List */}
      <div className="grid md:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 relative"
          >
            <img
              src={r.image}
              alt="Restaurant"
              className="h-36 w-full object-cover rounded"
            />
            <h3 className="mt-3 font-bold">{r.name}</h3>
            <p className="text-gray-500 text-sm">{r.location}</p>

            <div className="absolute top-2 right-2 flex gap-2">
              <button className="text-blue-500" onClick={() => handleEdit(r)}>
                <Edit size={18} />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(r._id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRestaurants;
