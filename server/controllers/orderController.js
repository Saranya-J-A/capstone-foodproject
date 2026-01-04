const Order = require('../models/OrderModel');
const Cart = require('../models/CartModel');
const Item = require('../models/ItemModel');
const Offer = require('../models/OfferModel');

//  Create a new order from user's cart
const createOrder = async (req, res) => {
  try {
    const userId = req.user;

    const cart = await Cart.findOne({ user: userId }).populate('items.item');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Your cart is empty' });

    // Recalculate total price for safety
    let totalPrice = 0;
    for (const i of cart.items) {
      totalPrice += i.item.price * i.quantity;
    }

    // Apply offer if any
    let discount = 0;
    let offerDetails = null;
    if (cart.offer) {
      const offer = await Offer.findById(cart.offer);
      if (offer) {
        discount = (totalPrice * offer.discountPercent) / 100;
        offerDetails = offer;
      }
    }

    const finalPrice = totalPrice - discount;

    // Create order
    const newOrder = new Order({
      user: userId,
      items: cart.items.map(i => ({
        item: i.item._id,
        quantity: i.quantity
      })),
      totalPrice: finalPrice,
      discountApplied: discount,
      offer: offerDetails ? offerDetails._id : null,
      paymentStatus: 'Pending',
      orderStatus: 'Processing',
    });

    await newOrder.save();

    // Clear the cart after order is placed
    cart.items = [];
    cart.offer = null;
    cart.totalPrice = 0;
    await cart.save();

    res.json({
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.item', 'name price image')
      .populate('offer', 'code discountPercent');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get logged-in user orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ user: userId })
      .populate('items.item', 'name price image')
      .populate('offer', 'code discountPercent')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get single order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate('items.item', 'name price image')
      .populate('offer', 'code discountPercent');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOrder, getAllOrders, getUserOrders, getOrderById};
