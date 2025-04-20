const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// LOGIN route
router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  // Admin login
  if (roll === "admin1" && password === "admin1") {
    return res.json({
      username: "Admin",
      roll: "admin1",
      role: "admin"
    });
  }

  // Student login
  try {
    const student = await Student.findOne({ roll, password });
    if (!student) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      ...student.toObject(),
      role: "student"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

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
