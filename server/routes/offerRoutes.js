const express = require("express");
const router = express.Router();
const authAdmin = require("../middlewares/authAdmin");

const { createOffer, getOffers, updateOffer, deleteOffer} = require("../controllers/offerController");

// CREATE offer (Admin only)
router.post("/", authAdmin, createOffer);

// GET all offers (Public/Admin)
router.get("/", getOffers);

// UPDATE offer (Admin only)
router.put("/:id", authAdmin, updateOffer);

// DELETE offer (Admin only)
router.delete("/:id", authAdmin, deleteOffer);

module.exports = router;
