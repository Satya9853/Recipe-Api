const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
    },
    ingredients: [
      {
        quantity: {
          type: String,
          required: [true, "please provide quantity"],
        },
        name: {
          type: String,
          required: [true, "please provide ingredient name"],
        },
        type: {
          type: String,
          required: [true, "please provide ingredient type"],
          maxlength: 50,
        },
      },
    ],
    steps: [
      {
        type: String,
        required: [true, "please provide steps"],
      },
    ],
    timers: [
      {
        type: Number,
      },
    ],
    imageURL: {
      type: String,
      required: [true, "Please Provide Image Url"],
    },
    originalURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("recipe", recipeSchema);
