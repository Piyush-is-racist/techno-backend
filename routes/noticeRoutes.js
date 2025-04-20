const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");

// GET all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json({ success: true, data: notices });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ success: false, message: "Error fetching notices" });
  }
});

// POST new notice
router.post("/", async (req, res) => {
  const { title, description, fileURL } = req.body;

  try {
    const newNotice = new Notice({
      title,
      description,
      fileURL,
      date: new Date()
    });

    await newNotice.save();
    res.status(201).json({ success: true, message: "Notice created successfully", data: newNotice });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(400).json({ success: false, message: "Failed to create notice" });
  }
});

// DELETE notice by ID
router.delete("/:id", async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ success: false, message: "Failed to delete notice" });
  }
});

module.exports = router;
