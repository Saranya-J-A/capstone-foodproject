const Restaurant = require('../models/RestaurantModel');
const { cloudinaryInstance } = require('../config/cloudinary');

//  Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;

    if (!name) return res.status(400).json({ message: 'Restaurant name required' });

    let imageUrl = image || "";   // ✅ supports URL

    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(
        req.file.path,
        { folder: 'restaurants' }
      );
      imageUrl = cloudinaryResponse.secure_url;
    }

    const restaurant = await Restaurant.create({
      name,
      description,
      location,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      restaurant,
    });
  } catch (error) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



//  Get All Restaurants

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      restaurants,   // ✅ frontend expects this
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//  Get Single Restaurant by ID

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//  Update Restaurant

const updateRestaurant = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    let imageUrl = image || restaurant.image; // URL support

    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(
        req.file.path,
        { folder: 'restaurants' }
      );
      imageUrl = cloudinaryResponse.secure_url;
    }

    restaurant.name = name || restaurant.name;
    restaurant.description = description || restaurant.description;
    restaurant.location = location || restaurant.location;
    restaurant.image = imageUrl;

    const updated = await restaurant.save();

    res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
      restaurant: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


//  Delete Restaurant

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    res.status(200).json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createRestaurant,  getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant,};
