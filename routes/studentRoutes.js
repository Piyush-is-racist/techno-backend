const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Fees = require("../models/Fees");
const Marks = require("../models/Marks");

// LOGIN route (for students only)
router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  try {
    const student = await Student.findOne({ roll, password });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      role: "student",
      student,
    });
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

// GET a student by roll
router.get("/:roll", async (req, res) => {
  try {
    const student = await Student.findOne({ roll: req.params.roll });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching student profile" });
  }
});

// UPDATE student profile by roll
router.put("/:roll", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { roll: req.params.roll },
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.json({ success: true, data: updatedStudent });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update student profile" });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const { rolls } = req.body;
    if (!Array.isArray(rolls)) return res.status(400).json({ success: false, message: "Invalid data" });

    const deleteResult = await Student.deleteMany({ roll: { $in: rolls } });
    await Attendance.deleteMany({ roll: { $in: rolls } });
    await Fees.deleteMany({ roll: { $in: rolls } });
    await Marks.deleteMany({ roll: { $in: rolls } });

    res.json({ success: true, deleted: deleteResult.deletedCount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting students" });
  }
});
// GET marks by roll (read-only)
router.get("/:roll/marks", async (req, res) => {
  try {
    const marks = await Marks.findOne({ roll: req.params.roll });
    if (!marks) {
      return res.status(404).json({ success: false, message: "Marks not found" });
    }
    res.json({ success: true, data: marks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching marks" });
  }
});

// GET fees by roll (read-only)
router.get("/:roll/fees", async (req, res) => {
  try {
    const fees = await Fees.findOne({ roll: req.params.roll });
    if (!fees) {
      return res.status(404).json({ success: false, message: "Fees not found" });
    }
    res.json({ success: true, data: fees });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching fees" });
  }
});

// GET attendance by roll (read-only)
router.get("/:roll/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.findOne({ roll: req.params.roll });
    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance not found" });
    }
    res.json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching attendance" });
  }
});

// CREATE student + attendance + fees + marks
router.post("/create", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();

    // Attendance
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

    // Fees
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

    // Marks
    const emptySubject = {
      sub1: { ca1: 0, ca2: 0, ca3: 0, ca4: 0 },
      sub2: { ca1: 0, ca2: 0, ca3: 0, ca4: 0 },
      sub3: { ca1: 0, ca2: 0, ca3: 0, ca4: 0 },
      sub4: { ca1: 0, ca2: 0, ca3: 0, ca4: 0 },
      sub5: { ca1: 0, ca2: 0, ca3: 0, ca4: 0 },
    };

    const marks = new Marks({
      roll: newStudent.roll,
      name: newStudent.name,
      year: newStudent.year,
      marks: {
        sem1: emptySubject,
        sem2: emptySubject,
        sem3: emptySubject,
        sem4: emptySubject,
        sem5: emptySubject,
        sem6: emptySubject,
        sem7: emptySubject,
        sem8: emptySubject
      }
    });
    await marks.save();

    res.status(201).json({
      success: true,
      message: "Student, attendance, fees, and marks created successfully"
    });
  } catch (err) {
    console.error("Create error:", err);
    res.status(400).json({ success: false, message: "Failed to create student or related records" });
  }
});

module.exports = router;
