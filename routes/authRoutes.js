const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  try {
    // Try admin login first
    const admin = await Admin.findOne({ roll, password });
    if (admin) {
      return res.json({
        success: true,
        role: "admin",
        name: "Admin"
      });
    }

    // Then try student login
    const student = await Student.findOne({ roll, password });
    if (student) {
      return res.json({
        success: true,
        role: "student",
        name: student.name,
        student
      });
    }

    // If neither found
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
