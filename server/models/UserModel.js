const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    minLength: [5, 'Email must be at least 5 characters long'],
    maxLength: [100, 'Email cannot exceed 100 characters'],
    unique: true, 
  },
  password: {
    type: String,
    required: [true, 'Password is required']
    // removed maxLength to allow bcrypt hash
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'delivery'],
    default: 'user',
  },
  address: String,
  phone: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
