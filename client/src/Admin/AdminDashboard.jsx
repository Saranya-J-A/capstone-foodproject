import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/admin/restaurants"
          className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold text-yellow-400">Manage Restaurants</h2>
          <p className="text-gray-400 mt-2">View, edit, delete restaurants</p>
        </Link>

        <Link
          to="/admin/items"
          className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold text-yellow-400">Manage Items</h2>
          <p className="text-gray-400 mt-2">View, edit, delete menu items</p>
        </Link>

        <Link
          to="/admin/add-restaurant"
          className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold text-yellow-400">Add Restaurant</h2>
        </Link>

        <Link
          to="/admin/add-item"
          className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-700 transition"
        >
          <h2 className="text-xl font-semibold text-yellow-400">Add Item</h2>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;
