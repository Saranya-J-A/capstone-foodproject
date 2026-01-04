import { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user/register", form);
      alert("Registered successfully. Please login.");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-900 p-8 rounded shadow w-96"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Register</h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-2 bg-yellow-400 rounded text-black font-semibold">
          Register
        </button>

        {/* Back to login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
