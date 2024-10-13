// models/car.model.js
const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a category'],
    },
    color: {
      type: String,
      required: [true, 'Please add a color'],
    },
    model: {
      type: String,
      required: [true, 'Please add a model'],
    },
    make: {
      type: String,
      required: [true, 'Please add a make'],
    },
    registrationNo: {
      type: String,
      required: [true, 'Please add a registration number'],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Car', CarSchema);
