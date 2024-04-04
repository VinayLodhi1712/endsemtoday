const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Answer: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true, 
    },
    MobileNo: {
      type: Number,
      required: true,
      unique: true,
    },
    Role: {
      type: Number,
      required: true,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    Bookmarked: [
      {
        type: mongoose.ObjectId,
        ref: "Questions",
      },
    ],
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("Users", UserSchema);
