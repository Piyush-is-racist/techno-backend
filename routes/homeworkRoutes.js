const express = require("express");
const router = express.Router();
const Homework = require("../models/Homework");

// GET all homework
router.get("/", async (req, res) => {
  try {
    const data = await Homework.find().sort({ date: -1 });
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching homework:", error);
    res.status(500).json({ success: false, message: "Error fetching homework" });
  }
});

// POST new homework
router.post("/", async (req, res) => {
  const { title, description, fileURL } = req.body;

  try {
    const newEntry = new Homework({ title, description, fileURL });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Homework added", data: newEntry });
  } catch (error) {
    console.error("Error posting homework:", error);
    res.status(400).json({ success: false, message: "Failed to create homework" });
  }
});

// DELETE homework
router.delete("/:id", async (req, res) => {
  try {
    await Homework.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Homework deleted" });
  } catch (error) {
    console.error("Error deleting homework:", error);
    res.status(500).json({ success: false, message: "Failed to delete homework" });
  }
});

module.exports = router;
