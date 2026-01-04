
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user:
   {
     type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
     },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: Number
    }
  ],
  totalPrice:
   {
     type: Number, required: true
     },
  offer:
   {
     type: mongoose.Schema.Types.ObjectId, ref: 'Offer', default: null
     },
  status:
   {
     type: String, enum: ['Pending', 'Confirmed', 'Delivered'], default: 'Pending'
     },
  createdAt:
   {
     type: Date, default: Date.now
     }
});

module.exports = mongoose.model('Order', orderSchema);
