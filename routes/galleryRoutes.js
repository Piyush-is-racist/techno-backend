const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

// GET all galleries
router.get("/", async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, data: galleries });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching gallery items" });
  }
});

// POST a new gallery event
router.post("/", async (req, res) => {
  const { eventTitle, driveLinks } = req.body;
  try {
    const newEntry = new Gallery({ eventTitle, driveLinks });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Gallery item created", data: newEntry });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to create gallery item" });
  }
});

// DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
});

module.exports = router;
