const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const { createOrder, getAllOrders, getUserOrders, getOrderById } = require('../controllers/orderController');

// Create a new order (user)
router.post('/create', authUser, createOrder);

// Get all orders (admin)
router.get('/all', getAllOrders);

// Get orders by user
router.get('/user', authUser, getUserOrders);

// Get single order by ID
router.get('/:id', getOrderById);

module.exports = router;
