const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  expiryDate: Date,
  donorType: { type: String, default: 'user' },
  donated: { type: Boolean, default: false },
  booked: { type: Boolean, default: false },
  bookedBy: { type: String, default: null },
  createdBy: { type: String, required: false },
  image: { type: String, required: false },
});

module.exports = mongoose.model('Food', FoodSchema);
