// models/User.js

import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  ingredients: [
    {
      type: String,
      trim: true,
    },
  ],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
