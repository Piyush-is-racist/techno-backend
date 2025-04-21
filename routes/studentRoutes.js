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

// POST to update or create marks
router.post("/", async (req, res) => {
  const entries = Array.isArray(req.body) ? req.body : [req.body];

  try {
    for (const entry of entries) {
      const { roll, name, year, marks } = entry;

      let existing = await Marks.findOne({ roll });

      if (existing) {
        existing.name = name;
        existing.year = year;
        existing.marks = marks;
        await existing.save();
      } else {
        await Marks.create({ roll, name, year, marks });
      }
    }

    res.status(201).json({ success: true, message: "Marks updated successfully" });
  } catch (err) {
    console.error("Marks error:", err);
    res.status(500).json({ success: false, message: "Failed to save marks" });
  }
});

module.exports = router;
