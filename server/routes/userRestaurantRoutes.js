const express = require("express");
const router = express.Router();

const {
  getAllRestaurants,
  getRestaurantById,
} = require("../controllers/adminRestaurantController");

/**
 * PUBLIC ROUTES
 * These MUST stay unprotected
 */

// Get all restaurants
router.get("/", getAllRestaurants);

// Get single restaurant by ID (used for menu page)
router.get("/:id", getRestaurantById);

module.exports = router;
