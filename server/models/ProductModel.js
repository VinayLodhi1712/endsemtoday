const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numofreviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: String, 
        ref: "Users",
        required: true,
      }, 
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },],
  category: {
    type: mongoose.ObjectId,
    ref: "Category",
    required: true,
  },
  photo: {
    data: Buffer, 
    contentType: String,
  }, 
  owner: {
    type: mongoose.ObjectId, 
    ref: "Users",
    required: true,
  },
}, 
{ timestamps: true }
);
module.exports = mongoose.model("Products", ProductSchema);