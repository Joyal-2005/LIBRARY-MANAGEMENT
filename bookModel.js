const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  author: { type: String },
  category: { type: String },
  price: { type: Number }
});

module.exports = mongoose.model("Book", bookSchema);

