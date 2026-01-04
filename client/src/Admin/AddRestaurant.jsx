import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    image: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text: '' }

  const navigate = useNavigate();

  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.location.trim()) return "Location is required";
    return null;
  };

  // Try two possible endpoints (fallback) so route name mismatches won't block you
  const postWithFallback = async (formData) => {
    const endpoints = ["/restaurant-admin", "/admin/restaurants"];
    let lastError = null;

    for (const ep of endpoints) {
      try {
        const res = await api.post(ep, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // if response is ok return it
        return res;
      } catch (err) {
        console.warn(`POST ${ep} failed:`, err?.response?.status || err.message);
        lastError = err;
        // try next endpoint
      }
    }
    // if all failed, throw last error
    throw lastError;
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const vErr = validate();
    if (vErr) {
      setMessage({ type: "error", text: vErr });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("location", form.location);
      formData.append("description", form.description || "");

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      } else if (form.image) {
        // send the URL as plain field so backend can accept it
        formData.append("image", form.image);
      }

      const res = await postWithFallback(formData);

      console.log("Create restaurant response:", res?.data ?? res);
      setMessage({ type: "success", text: "Restaurant saved successfully." });

      // optionally reset form and navigate after short delay so user sees message
      setTimeout(() => {
        setForm({ name: "", location: "", description: "", image: "", imageFile: null });
        navigate("/admin/restaurants");
      }, 700);
    } catch (err) {
      console.error("Failed to create restaurant:", err);
      // show server message if available
      const serverMsg = err?.response?.data?.message || err?.message || "Save failed";
      setMessage({ type: "error", text: serverMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl text-yellow-400 mb-4">Add Restaurant</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={submit} className="grid gap-3">
        <input
          placeholder="Name"
          className="p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Location"
          className="p-2 border rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <input
          placeholder="Description"
          className="p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Image URL */}
        <input
          placeholder="Image URL (optional)"
          className="p-2 border rounded"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value, imageFile: null })}
        />

        {/* File Input */}
        <input
          type="file"
          accept="image/*"
          className="p-2 border rounded"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0], image: "" })}
        />

        <button
          type="submit"
          className={`bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-500 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Restaurant"}
        </button>
      </form>

      <div className="text-sm text-gray-500 mt-3">
        Tip: You can either paste an image URL or upload a file. If both are provided, uploaded file is used.
      </div>
    </div>
  );
};

export default AddRestaurant;
