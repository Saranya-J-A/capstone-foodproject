const mongoose = require(`mongoose`)
const restaurantSchema = new mongoose.Schema(
    {
  name: 
  { 
    type: String, 
    required: true 
},
menu: 
[{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  description: String,
  location: String,
  image: String,
  rating: { type: Number, default: 0 },
});

module.exports = mongoose.model(`restaurant`,restaurantSchema)

