const Item = require('../models/ItemModel');
const Restaurant = require('../models/RestaurantModel');
const { cloudinaryInstance } = require('../config/cloudinary');

//  Create Item
const createItem = async (req, res) => {
  try {
    const { name, description, price, category, restaurantId, imageUrl } = req.body;

    // Validation
    if (!name || !price || !restaurantId) {
      return res.status(400).json({ message: 'Name, price, and restaurantId required' });
    }

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Handle image: file OR URL
    let finalImageUrl = imageUrl || '';

    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      finalImageUrl = cloudinaryResponse.secure_url;
    }

    // Create item
    const newItem = await Item.create({
      name,
      description,
      price,
      category,
      restaurant: restaurantId,
      image: finalImageUrl,
    });

    // Add item reference to restaurant’s menu array
    restaurant.menu.push(newItem._id);
    await restaurant.save();

    res.status(201).json({
      message: 'Item created successfully',
      item: newItem,
    });
  } catch (error) {
    console.error(' Error creating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('restaurant', 'name location');

    res.status(200).json({
      items,   // FRONTEND EXPECTS THIS!
    });
    
  } catch (error) {
    console.error(' Error fetching items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//  Get item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('restaurant', 'name');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    console.error(' Error fetching item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Update item
const updateItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl } = req.body;

    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Handle image update: file OR URL
    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      item.image = cloudinaryResponse.secure_url;
    } else if (imageUrl) {
      item.image = imageUrl; // Update URL only when provided
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.category = category || item.category;

    await item.save();

    res.status(200).json({
      message: 'Item updated successfully',
      item,
    });
  } catch (error) {
    console.error(' Error updating item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Remove item from the restaurant’s menu
    await Restaurant.updateOne(
      { _id: item.restaurant },
      { $pull: { menu: item._id } }
    );

    await item.deleteOne();

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(' Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createItem, getAllItems, getItemById, updateItem, deleteItem };
