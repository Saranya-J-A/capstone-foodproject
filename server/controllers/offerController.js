const Offer = require('../models/OfferModel');

// Create offer (admin)
const createOffer = async (req, res) => {
  try {
    const { title, code, description, discountPercent, maxAmount, minOrderValue, validFrom, validUntil } = req.body;
    if (!title || !code || !discountPercent) return res.status(400).json({ message: 'title, code and discountPercent required' });

    const exists = await Offer.findOne({ code });
    if (exists) return res.status(400).json({ message: 'Offer code already exists' });

    const offer = await Offer.create({ title, code, description, discountPercent, maxAmount, minOrderValue, validFrom, validUntil });
    res.status(201).json({ message: 'Offer created', offer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all offers (admin/public)
const getOffers = async (req, res) => {
  try {
    // optional query param ?activeOnly=true
    const query = {};
    if (req.query.activeOnly === 'true') {
      query.active = true;
      query.validFrom = { $lte: new Date() };
      query.$or = [{ validUntil: null }, { validUntil: { $gte: new Date() } }];
    }
    const offers = await Offer.find(query).sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update offer (admin)
const updateOffer = async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer updated', offer: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete
const deleteOffer = async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createOffer, getOffers, updateOffer, deleteOffer };
