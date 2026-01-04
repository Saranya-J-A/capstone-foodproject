import { useState } from "react";
import api from "../api/api";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // SUPPORT BOTH redirect METHODS
  const redirectFromState = location.state?.from;
  const redirectFromQuery = searchParams.get("redirect");

  const redirectPath =
    redirectFromState ||
    (redirectFromQuery === "checkout" ? "/checkout" : "/");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        form.role === "admin" ? "/admin/login" : "/user/login";

      const res = await api.post(
        endpoint,
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: form.role === "admin",
        }
      );

      //  USER LOGIN
      if (form.role === "user") {
        localStorage.setItem("token", res.data.token);
        alert("User login successful");

        navigate(redirectPath, { replace: true });
      }

      // ADMIN LOGIN
      if (form.role === "admin") {
        alert("Admin login successful");
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="p-8 w-96 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <select
          className="w-full mb-3 p-2 border"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button className="w-full bg-yellow-400 py-2 rounded">
          Login
        </button>

        {form.role === "user" && (
          <p className="text-center mt-3">
            No account? <Link to="/register">Register</Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
