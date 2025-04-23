const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileURL: { type: String },
  yearGroup: { type: String, default: "All" }, // "1", "2", "3", "4", or "All"
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Homework", homeworkSchema);
