const express = require('express');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const { addToCart, removeFromCart, getCart, applyOfferToCart, clearCart} = require('../controllers/cartController');

router.post('/add', authUser, addToCart);
router.delete('/remove/:itemId', authUser, removeFromCart);
router.get('/', authUser, getCart);
router.post('/apply-offer', authUser, applyOfferToCart);
router.delete('/clear', authUser, clearCart);

module.exports = router;
