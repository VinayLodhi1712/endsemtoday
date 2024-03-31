const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],

    buyer: {
      type: mongoose.ObjectId,
      ref: "Users",
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shipped", "Canceled", "Delivered"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
