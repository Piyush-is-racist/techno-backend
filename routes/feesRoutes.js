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

// PUT /bulk – update existing fees by _id
router.put("/bulk", async (req, res) => {
  const updates = req.body;

  try {
    for (const item of updates) {
      const { _id, ...rest } = item;
      await Fees.findByIdAndUpdate(_id, rest, { new: true });
    }
    res.json({ success: true, message: "Fees updated" });
  } catch (err) {
    console.error("❌ Bulk fees update error:", err);
    res.status(500).json({ success: false, message: "Bulk update failed" });
  }
});

// POST – upsert by roll
router.post("/", async (req, res) => {
  const records = Array.isArray(req.body) ? req.body : [req.body];

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
