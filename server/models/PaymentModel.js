const mongoose = require(`mongoose`)

const paymentSchema = new mongoose.Schema(
    {
  order: 
  {
     type: mongoose.Schema.Types.ObjectId, ref: "Order" 
    },
  paymentMethod: 
  {
    type: String,
    enum: ["cash_on_delivery", "card", "upi", "wallet"],
    default: "cash_on_delivery",
  },
  transactionId: 
  { 
    type: String 
},
  status: 
  {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  amount: Number,
});

module.exports = mongoose.model(`payment`,paymentSchema)
