const Restaurant = require("../models/RestaurantModel");

/**
 GET ALL RESTAURANTS (HOME / LIST PAGE)
 */
const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().lean();
    res.json({ restaurants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 GET SINGLE RESTAURANT BY ID (MENU PAGE)
 */
const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id).lean();

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json({ restaurant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
};
