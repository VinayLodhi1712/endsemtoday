const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnswerSchema = new Schema(
  {
    questionid: {
      type: mongoose.ObjectId,
      ref: "Questions",
      required: true,
    },
    // Answer posted By user
    answer: {
      type: String,
      required: true,
    },
    // Id Of User who has posted answer for  question
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    UserWhoVoted: [
      {
        type: mongoose.ObjectId,
        ref: "Users",
      },
    ],
  },
  { timestamps: true }
);

const answer = mongoose.model("answers", AnswerSchema);
module.exports = answer;
