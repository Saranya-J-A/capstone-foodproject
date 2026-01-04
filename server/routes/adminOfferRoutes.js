const express = require('express');
const router = express.Router();
const authAdmin = require('../middlewares/authAdmin');
const { createOffer, getOffers, updateOffer, deleteOffer } = require('../controllers/offerController');

router.post('/', authAdmin, createOffer);
router.get('/', authAdmin, getOffers);
router.put('/:id', authAdmin, updateOffer);
router.delete('/:id', authAdmin, deleteOffer);

module.exports = router;
