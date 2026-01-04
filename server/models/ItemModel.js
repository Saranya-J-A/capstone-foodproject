const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: 
    {
       type: String, required: true
       },
    description:
     {
       type: String
       },
    price:
     {
       type: Number, required: true
       },
    category:
     {
       type: String
       },
    image:
     {
       type: String
       }, // Cloudinary URL
    restaurant:
     {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'restaurant',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
