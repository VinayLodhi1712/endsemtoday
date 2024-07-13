const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      //required: true,
    },
    Answer: {
      type: String,
     // required: true,
    },
    Location: {
      type: String,
      //required: true,
    },
    MobileNo: {
      type: Number,
      //required: true,
    },
    SecurityQuestion: {
      type: String,
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
    Github: {
      type: String,
    },
    LinkedIn: {
      type: String,
    },
    Website: {
      type: String,
    },
    Reputation: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String], //add multiple tags
      required: true,
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
