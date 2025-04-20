const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Simplified login route
router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  // Admin check
  if (roll === "admin1" && password === "admin1") {
    return res.json({ success: true });
  }

  try {
const student = await Student.findOne({ roll, password });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

module.exports = router;

// CREATE account route
router.post("/create", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create student" });
  }
});

module.exports = router;
