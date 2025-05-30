const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  fileURL: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notice", noticeSchema);
