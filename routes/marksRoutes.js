const express = require("express");
const router = express.Router();
const Marks = require("../models/Marks");

router.get("/", async (req, res) => {
  try {
    const data = await Marks.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching marks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const incoming = Array.isArray(req.body) ? req.body : [req.body];

    for (const markEntry of incoming) {
      const existing = await Marks.findOne({ roll: markEntry.roll });
      if (existing) {
        existing.marks = markEntry.marks;
        await existing.save();
      } else {
        await Marks.create(markEntry);
      }
    }

    res.status(201).json({ success: true, message: "Marks processed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving marks" });
  }
});

module.exports = router;
