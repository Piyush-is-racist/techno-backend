const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  eventTitle: { type: String, required: true },
  driveLinks: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Gallery", gallerySchema);
