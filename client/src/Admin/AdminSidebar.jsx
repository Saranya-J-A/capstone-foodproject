import { Link, useNavigate } from "react-router-dom";
import { Home, Utensils, List, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    nav("/admin/login");
  };

  return (
    <div className="w-60 min-h-screen bg-gray-900 text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>

      <nav className="space-y-4">
        <Link to="/admin/dashboard" className="flex items-center gap-3 hover:text-yellow-400">
          <Home /> Dashboard
        </Link>

        <Link to="/admin/restaurants" className="flex items-center gap-3 hover:text-yellow-400">
          <Utensils /> Restaurants
        </Link>

        <Link to="/admin/items" className="flex items-center gap-3 hover:text-yellow-400">
          <List /> Items
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-3 mt-6 text-red-400 hover:text-red-300"
        >
          <LogOut /> Logout
        </button>
      </nav>
    </div>
  );
}
