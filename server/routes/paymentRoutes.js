const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {
  createCheckoutSession,
  verifyCheckoutSession,
} = require("../controllers/paymentController");

//  USER MUST BE LOGGED IN TO PAY
router.post(
  "/create-checkout-session",
  authUser,
  createCheckoutSession
);

// STRIPE CALLBACK – NO AUTH
router.get(
  "/verify-checkout-session",
  verifyCheckoutSession
);

module.exports = router;
