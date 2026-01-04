const Cart = require('../models/CartModel');
const Item = require('../models/ItemModel');
const Offer = require('../models/OfferModel');

//   calculate total price
async function calculateCartTotal(items) {
  const itemIds = items.map(i => i.item);
  const dbItems = await Item.find({ _id: { $in: itemIds } });

  let total = 0;
  for (const i of items) {
    const found = dbItems.find(d => d._id.toString() === i.item.toString());
    if (found) total += found.price * i.quantity;
  }
  return total;
}

//  Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) return res.status(400).json({ message: 'Item ID required' });
    if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be positive' });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    //  Clean up any corrupted entries
    cart.items = cart.items.filter(i => i.item);

    //  Safe check for existing item
    const existingIndex = cart.items.findIndex(
      i => i.item && i.item.toString() === itemId
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }

    cart.totalPrice = await calculateCartTotal(cart.items);
    await cart.save();

    res.json({ message: 'Item added to cart', cart });
  } catch (err) {
    console.error(' Error in addToCart:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(i => i.item.toString() !== itemId);
    cart.totalPrice = await calculateCartTotal(cart.items);
    await cart.save();

    res.json({ message: 'Item removed', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Get cart details
const getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ user: userId })
      .populate('items.item', 'name price image');

    if (!cart) return res.json({ items: [], totalPrice: 0 });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Apply offer to cart
const applyOfferToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { code } = req.body;

    if (!code) return res.status(400).json({ message: 'Offer code required' });

    const offer = await Offer.findOne({ code, active: true });
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    const now = new Date();
    if (offer.validFrom && offer.validFrom > now)
      return res.status(400).json({ message: 'Offer not yet active' });
    if (offer.validUntil && offer.validUntil < now)
      return res.status(400).json({ message: 'Offer expired' });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Apply discount
    const discount = (cart.totalPrice * offer.discountPercent) / 100;
    cart.totalPrice = cart.totalPrice - discount;
    cart.offer = offer._id;
    await cart.save();

    res.json({ message: 'Offer applied successfully', cart, offer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//  Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user;
    await Cart.findOneAndUpdate(
      { user: userId },
      { items: [], offer: null, totalPrice: 0 }
    );
    res.json({ message: 'Cart cleared successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addToCart, removeFromCart, getCart, applyOfferToCart, clearCart};
