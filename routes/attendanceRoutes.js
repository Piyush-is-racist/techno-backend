const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.get("/", async (req, res) => {
  try {
    const data = await Attendance.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching attendance" });
  }
});

router.post("/", async (req, res) => {
  const { roll, name, year, months } = req.body;
  try {
    const existing = await Attendance.findOne({ roll });
    if (existing) {
      existing.months = months;
      await existing.save();
      return res.json({ success: true, message: "Updated attendance" });
    }

    await Attendance.create({ roll, name, year, months });
    res.status(201).json({ success: true, message: "Created new attendance record" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving attendance" });
  }
});

module.exports = router;
