const express = require("express");
const router = express.Router();

// ROUTES
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const restaurantAdminRoutes = require("./adminRestaurantRoutes");
const userRestaurantRoutes = require("./userRestaurantRoutes");
const adminItemRoutes = require("./adminItemRoutes");
const userItemRoutes = require("./userItemRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const offerRoutes = require("./offerRoutes");
const paymentRoutes = require("./paymentRoutes");

//  USE YOUR EXISTING AUTH FILE
const authUser = require("../middlewares/authUser");

/* ================= ADMIN ROUTES ================= */
router.use("/admin/restaurants", restaurantAdminRoutes);
router.use("/admin/items", adminItemRoutes);
router.use("/admin", adminRoutes);

/* ================= PUBLIC ROUTES ================= */
router.use("/user", userRoutes);
router.use("/restaurant", userRestaurantRoutes); // menu, restaurants
router.use("/items", userItemRoutes);
router.use("/offers", offerRoutes);

/* ================= PROTECTED USER ROUTES ================= */
router.use("/cart", authUser, cartRoutes);
router.use("/orders", authUser, orderRoutes);

/* ================= PAYMENT ================= */
router.use("/payment", paymentRoutes);

module.exports = router;
