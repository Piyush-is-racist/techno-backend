const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const Student = require("../models/Student");

// Unified LOGIN route for admin and student
router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  try {
    // Check admin first
    const admin = await Admin.findOne({ roll, password });
    if (admin) {
      return res.json({ success: true, role: "admin" });
    }

    // Check student
    const student = await Student.findOne({ roll, password });
    if (student) {
      return res.json({ success: true, role: "student", student });
    }

    // If neither found
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.error("Unified login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
