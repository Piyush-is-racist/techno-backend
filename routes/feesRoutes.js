const express = require("express");
const router = express.Router();
const Fees = require("../models/Fees");

// GET all fee records
router.get("/", async (req, res) => {
  try {
    const data = await Fees.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching fees" });
  }
});

// POST multiple fees records (bulk sync from Google Sheets)
router.post("/", async (req, res) => {
  const records = req.body; // expecting array

  if (!Array.isArray(records)) {
    return res.status(400).json({ success: false, message: "Invalid format: expected an array" });
  }

  try {
    for (const entry of records) {
      const { roll, name, year, semesters } = entry;

      await Fees.findOneAndUpdate(
        { roll },
        { roll, name, year, semesters },
        { upsert: true, new: true }
      );
    }

    res.json({ success: true, message: "Fees records updated" });
  } catch (err) {
    console.error("❌ Fees sync error:", err);
    res.status(500).json({ success: false, message: "Error saving fees records" });
  }
});

module.exports = router;
