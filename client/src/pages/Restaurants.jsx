import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/restaurant")
      .then((res) => {
        setRestaurants(res.data.restaurants || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch restaurants");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading restaurants...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">Restaurants</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {restaurants.map((r) => (
          <div
            key={r._id}
            onClick={() => navigate(`/restaurant/${r._id}/menu`)}
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition-transform p-4"
          >
            <img
              src={r.image || "/placeholder.png"}
              alt={r.name}
              className="h-36 w-full object-cover rounded"
            />
            <h3 className="text-lg mt-3 font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-500">{r.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
