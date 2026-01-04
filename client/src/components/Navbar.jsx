import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart, restaurantId } = useCart();
  const navigate = useNavigate();

  //  Menu button logic
  const handleMenuClick = () => {
    if (restaurantId) {
      navigate(`/restaurant/${restaurantId}/menu`);
    } else {
      navigate("/restaurants");
    }
  };

  const linkClass = ({ isActive }) =>
    isActive ? "font-semibold border-b-2 border-black" : "hover:opacity-80";

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-yellow-500 text-black shadow-md">
      {/* LOGO */}
      <NavLink to="/" className="font-bold text-xl">
        FoodieZone
      </NavLink>

      {/* LINKS */}
      <ul className="hidden md:flex gap-6 font-medium items-center">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/restaurants" className={linkClass}>
          Restaurants
        </NavLink>

        {/*  MENU BUTTON */}
        <button
          onClick={handleMenuClick}
          className="font-medium hover:opacity-80"
        >
          Menu
        </button>

        {/* CART */}
        <NavLink
          to="/cart"
          className="relative flex items-center gap-1 hover:opacity-80"
        >
          <ShoppingCart size={20} />
          Cart

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </NavLink>

        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
      </ul>

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
