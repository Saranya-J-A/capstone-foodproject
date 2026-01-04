const express = require("express");
const router = express.Router();
const { getItemsByRestaurant } = require("../controllers/userItemController");

// PUBLIC – no auth
router.get("/restaurant/:restaurantId", getItemsByRestaurant);

module.exports = router;
