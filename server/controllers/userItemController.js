const Restaurant = require("../models/RestaurantModel");


// GET ITEMS BY RESTAURANT (USER)

const getItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Find restaurant & populate menu items
    const restaurant = await Restaurant.findById(restaurantId).populate("menu");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({
      items: restaurant.menu || [],
    });
  } catch (error) {
    console.error("Error fetching restaurant items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getItemsByRestaurant,
};
