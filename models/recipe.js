const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: String, required: true },
});

module.exports = mongoose.model("Recipe", recipeSchema);
