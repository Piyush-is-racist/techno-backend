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

// PUT /bulk – update existing marks by _id
router.put("/bulk", async (req, res) => {
  const updates = req.body;

  try {
    for (const item of updates) {
      const { _id, ...rest } = item;
      await Marks.findByIdAndUpdate(_id, rest, { new: true });
    }
    res.json({ success: true, message: "Marks updated" });
  } catch (err) {
    console.error("❌ Bulk marks update error:", err);
    res.status(500).json({ success: false, message: "Bulk update failed" });
  }
});

// POST – upsert by roll
router.post("/", async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : [req.body];

  try {
    for (const entry of entries) {
      const { roll, name, year, marks } = entry;

      await Marks.findOneAndUpdate(
        { roll },
        { roll, name, year, marks },
        { upsert: true, new: true }
      );
    }

    res.status(201).json({ success: true, message: "Marks updated successfully" });
  } catch (err) {
    console.error("Marks error:", err);
    res.status(500).json({ success: false, message: "Failed to save marks" });
  }
});

module.exports = router;
