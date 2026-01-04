const express = require('express');
const router = express.Router();

const { registerAdmin, loginAdmin, logoutAdmin, getProfileAdmin, deleteAdmin} = require('../controllers/adminController');

const authAdmin = require('../middlewares/authAdmin');

// Admin Auth Routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/profile', authAdmin, getProfileAdmin);

//  Delete own admin account (corrected)
router.delete('/delete', authAdmin, deleteAdmin);

//  Restaurant Routes under Admin
const adminRestaurantRoutes = require('./adminRestaurantRoutes');
router.use('/restaurants', authAdmin, adminRestaurantRoutes);

//  Item Routes under Admin
const adminItemRoutes = require('./adminItemRoutes');
router.use('/items', authAdmin, adminItemRoutes);

//  Offer Routes under Admin
const offerRoutes = require('./offerRoutes');
router.use('/offers', authAdmin, offerRoutes);

module.exports = router;
