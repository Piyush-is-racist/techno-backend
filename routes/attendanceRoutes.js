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

// PUT /bulk – update existing attendance by _id
router.put("/bulk", async (req, res) => {
  const updates = req.body;

  try {
    for (const item of updates) {
      const { _id, ...rest } = item;
      await Attendance.findByIdAndUpdate(_id, rest, { new: true });
    }
    res.json({ success: true, message: "Attendance updated" });
  } catch (err) {
    console.error("❌ Bulk attendance update error:", err);
    res.status(500).json({ success: false, message: "Bulk update failed" });
  }
});

// POST – upsert by roll
router.post("/", async (req, res) => {
  const records = Array.isArray(req.body) ? req.body : [req.body];

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
