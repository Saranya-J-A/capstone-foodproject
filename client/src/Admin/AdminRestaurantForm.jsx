import React, { useState } from "react";

export default function AdminRestaurantForm({
  editingData,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState({
    name: editingData?.name || "",
    location: editingData?.location || "",
    image: editingData?.image || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-gray-800 p-6 rounded-xl w-96">
        <h2 className="text-xl text-yellow-400 mb-4">
          {editingData ? "Edit Restaurant" : "Add Restaurant"}
        </h2>

        <input
          name="name"
          placeholder="Restaurant Name"
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
          value={form.location}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded"
          value={form.image}
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-gray-600 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
