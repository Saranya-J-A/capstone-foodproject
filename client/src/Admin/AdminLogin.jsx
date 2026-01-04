import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post(
        "/admin/login",
        form,
        {
          withCredentials: true, 
        }
      );

      console.log("ADMIN LOGIN SUCCESS:", res.data);

      
      navigate("/admin/dashboard");

    } catch (err) {
      console.error("LOGIN FAILED:", err.response?.data);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm text-white">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 bg-gray-700 rounded"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            className="w-full bg-yellow-500 py-2 rounded font-bold"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
