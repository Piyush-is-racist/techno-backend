const express = require("express");
const router = express.Router();
const Classwork = require("../models/Classwork");

router.get("/", async (req, res) => {
  try {
    const data = await Classwork.find().sort({ date: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching classwork" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, fileURL } = req.body;
  try {
    const newEntry = new Classwork({ title, description, fileURL });
    await newEntry.save();
    res.status(201).json({ success: true, message: "Classwork added", data: newEntry });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to post classwork" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Classwork.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Classwork deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete classwork" });
  }
});

module.exports = router;
