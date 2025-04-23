const express = require("express");
const router = express.Router();
const Homework = require("../models/Homework");

// GET all homework
router.get("/", async (req, res) => {
  try {
    const data = await Homework.find().sort({ date: -1 });
    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch homework" });
  }
});

// POST new homework
router.post("/", async (req, res) => {
  try {
    const newItem = new Homework(req.body);
    await newItem.save();
    res.status(201).json({ success: true, message: "Homework added" });
  } catch {
    res.status(400).json({ success: false, message: "Failed to add homework" });
  }
});

// DELETE by ID
router.delete("/:id", async (req, res) => {
  try {
    await Homework.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Homework deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

module.exports = router;
