const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  pages: {
    type: String,
  },
  description: {
    type: String,
  },
  dateStarted: { type: Date },
  dateFinished: { type: Date },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("book", BookSchema);