const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Fees = require("../models/Fees");
const Marks = require("../models/Marks"); // ✅ add Marks model

// LOGIN route (for students only)
router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  try {
    const student = await Student.findOne({ roll, password });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true, student });
  } catch (err) {
    console.error("Student login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching students" });
  }
});

// CREATE student account + attendance + fees + marks
router.post("/create", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    // Create empty attendance
    const attendance = new Attendance({
      roll: newStudent.roll,
      name: newStudent.name,
      year: newStudent.year,
      months: {
        jan: "", feb: "", mar: "", apr: "", may: "", jun: "",
        jul: "", aug: "", sep: "", oct: "", nov: "", dec: ""
      }
    });
    await attendance.save();

    // Create empty fees
    const fees = new Fees({
      roll: newStudent.roll,
      name: newStudent.name,
      year: newStudent.year,
      semesters: {
        sem1: 0, sem2: 0, sem3: 0, sem4: 0,
        sem5: 0, sem6: 0, sem7: 0, sem8: 0
      }
    });
    await fees.save();

    // ✅ Create empty marks
    const marks = new Marks({
      roll: newStudent.roll,
      name: newStudent.name,
      year: newStudent.year,
      marks: {
        sem1: {}, sem2: {}, sem3: {}, sem4: {},
        sem5: {}, sem6: {}, sem7: {}, sem8: {}
      }
    });
    await marks.save();

    res.status(201).json({ success: true, message: "Student, attendance, fees, and marks created successfully" });
  } catch (err) {
    console.error("Create error:", err);
    res.status(400).json({ success: false, message: "Failed to create student or related records" });
  }
});

module.exports = router;
