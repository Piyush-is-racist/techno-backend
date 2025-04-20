const express = require("express");
const router = express.Router();

// Get all notices
router.get("/notices", (req, res) => {
  // Fetch notices logic
  res.send("All notices");
});

// Create a notice
router.post("/", (req, res) => {
  // Create notice logic
  res.send("Notice created");
});

module.exports = router;
