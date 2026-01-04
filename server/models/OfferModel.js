const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title:
   {
     type: String, required: true
     },
  code:
   {
     type: String, required: true, unique: true
     },
  description:
   {
     type: String
     },
  discountPercent:
   {
     type: Number, required: true
     }, 
  maxAmount:
   {
     type: Number
     }, 
  minOrderValue:
   {
     type: Number, default: 0
     },
  active:
   {
     type: Boolean, default: true
     },
  validFrom:
   {
     type: Date, default: Date.now
     },
  validUntil:
   { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
