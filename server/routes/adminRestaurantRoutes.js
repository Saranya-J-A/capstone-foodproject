const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant,deleteRestaurant} = require('../controllers/adminRestaurantController');

// Create restaurant
router.post('/', upload.single('image'), createRestaurant);

// Get all restaurants
router.get('/', getAllRestaurants);

// Get restaurant by ID
router.get('/:id', getRestaurantById);

// Update restaurant
router.put('/:id', upload.single('image'), updateRestaurant);

// Delete restaurant
router.delete('/:id', deleteRestaurant);

module.exports = router;
