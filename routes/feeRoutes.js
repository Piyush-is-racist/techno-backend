const express = require("express");
const router = express.Router();
const Fees = require("../models/Fees");

router.get("/", async (req, res) => {
  try {
    const data = await Fees.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching fees" });
  }
});

router.post("/", async (req, res) => {
  const { roll, name, year, semesters } = req.body;
  try {
    const existing = await Fees.findOne({ roll });
    if (existing) {
      existing.semesters = semesters;
      await existing.save();
      return res.json({ success: true, message: "Fees updated" });
    }

    await Fees.create({ roll, name, year, semesters });
    res.status(201).json({ success: true, message: "New fees record created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error saving fees" });
  }
});

module.exports = router;
