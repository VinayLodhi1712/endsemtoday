const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    AnswerCount: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String], //add multiple tags
      required: true,
    },
  },

  { timestamps: true }
);

const Questionmodel = mongoose.model("Questions", QuestionSchema);
module.exports = Questionmodel;
