const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// GET all attendance data
router.get("/", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching attendance" });
  }
});

// POST multiple attendance records (bulk sync from Google Sheets)
router.post("/", async (req, res) => {
  const records = req.body; // Expecting an array of attendance objects

  if (!Array.isArray(records)) {
    return res.status(400).json({ success: false, message: "Invalid format: expected an array" });
  }

  try {
    for (const entry of records) {
      const { roll, name, year, months } = entry;

      await Attendance.findOneAndUpdate(
        { roll },
        { roll, name, year, months },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: "Attendance records updated" });
  } catch (err) {
    console.error("❌ Attendance sync error:", err);
    res.status(500).json({ success: false, message: "Error saving attendance records" });
  }
});

module.exports = router;
