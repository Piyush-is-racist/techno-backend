const express = require("express");
const router = express.Router();

// Example route to get student profile
router.get("/:id", (req, res) => {
  const studentId = req.params.id;
  // Fetch student logic
  res.send(`Get student with ID ${studentId}`);
});

// Example route to update student
router.put("/:id", (req, res) => {
  const studentId = req.params.id;
  // Update student logic
  res.send(`Update student with ID ${studentId}`);
});

module.exports = router;
