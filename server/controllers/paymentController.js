const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");


// CREATE STRIPE CHECKOUT SESSION

exports.createCheckoutSession = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const line_items = cart.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",

      // STORE USER ID SAFELY IN STRIPE
      metadata: {
        userId: req.user,
      },

      success_url:
        "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


// VERIFY STRIPE PAYMENT & PLACE ORDER

exports.verifyCheckoutSession = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ success: false });
    }

    //  Verify payment from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false });
    }

    //  GET USER FROM STRIPE METADATA
    const userId = session.metadata.userId;

    //  Fetch user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.json({ success: true });
    }

    //  Create order
    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      paymentStatus: "paid",
      paymentId: session.payment_intent,
    });

    await order.save();

    // Clear cart
    await Cart.updateOne(
      { user: userId },
      { $set: { items: [], totalAmount: 0 } }
    );

    res.json({
      success: true,
      orderId: order._id,
    });
  } catch (err) {
    console.error("Payment verify error:", err.message);
    res.status(500).json({ success: false });
  }
};
