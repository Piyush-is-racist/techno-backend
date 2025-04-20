const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// Get all attendance records
router.get("/", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch records" });
  }
});

// Add or update attendance record
router.post("/", async (req, res) => {
  const { roll, name, year, months } = req.body;
  try {
    const existing = await Attendance.findOne({ roll });
    if (existing) {
      existing.name = name;
      existing.year = year;
      existing.months = months;
      await existing.save();
      res.json({ success: true, message: "Record updated" });
    } else {
      await Attendance.create({ roll, name, year, months });
      res.status(201).json({ success: true, message: "Record created" });
    }
  } catch (err) {
    console.error("Attendance error:", err);
    res.status(500).json({ success: false, message: "Failed to save record" });
  }
});

module.exports = router;
