const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");

// GET all marks
router.get("/", async (req, res) => {
  try {
    const data = await Marks.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching marks" });
  }
});

// POST bulk marks
router.post("/", async (req, res) => {
  const records = req.body;
  if (!Array.isArray(records)) {
    return res.status(400).json({ success: false, message: "Expected an array" });
  }

  try {
    for (const entry of records) {
      await Marks.findOneAndUpdate(
        { roll: entry.roll },
        entry,
        { upsert: true, new: true }
      );
    }
    res.json({ success: true, message: "Marks records updated" });
  } catch (err) {
    console.error("❌ Marks sync error:", err);
    res.status(500).json({ success: false, message: "Error saving marks records" });
  }
});

module.exports = router;
