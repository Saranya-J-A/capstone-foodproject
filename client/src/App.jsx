import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import RestaurantMenu from "./pages/RestaurantMenu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

// STEP-5: Payment verification page
import PaymentSuccess from "./pages/PaymentSuccess";

// Admin pages
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminItems from "./Admin/AdminItems";
import AdminRestaurants from "./Admin/AdminRestaurants";
import AddRestaurant from "./Admin/AddRestaurant";
import AddItem from "./Admin/AddItem";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

/* ================= USER LAYOUT ================= */
const UserLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const App = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>

            {/* ================= USER ROUTES ================= */}
            <Route element={<UserLayout />}>

              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/restaurant/:id" element={<RestaurantDetails />} />
              <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />

              {/* 🛒 CART */}
              <Route path="/cart" element={<Cart />} />

              {/*  CHECKOUT (LOGIN REQUIRED) */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/*  STEP-5: STRIPE SUCCESS → VERIFY PAYMENT */}
             <Route
  path="/payment-success"
  element={
    <ProtectedRoute>
      <PaymentSuccess />
    </ProtectedRoute>
  }
/>

              {/*  PAYMENT CANCEL */}
              <Route
                path="/user/payment/cancel"
                element={
                  <h1 className="p-10 text-center text-xl">
                    Payment Cancelled ❌
                  </h1>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

            </Route>

            {/* ================= ADMIN ROUTES ================= */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/items"
              element={
                <ProtectedRoute>
                  <AdminItems />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-item"
              element={
                <ProtectedRoute>
                  <AddItem />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/restaurants"
              element={
                <ProtectedRoute>
                  <AdminRestaurants />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/add-restaurant"
              element={
                <ProtectedRoute>
                  <AddRestaurant />
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
