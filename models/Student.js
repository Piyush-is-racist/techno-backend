// models/Student.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  tempRoll: String,
  roll: String,
  dob: String,
  name: String,
  gender: String,
  caste: String,
  nationality: String,
  bloodGroup: String,
  address: String,
  district: String,
  state: String,
  pin: String,
  phone: String,
  email: String,
  fatherName: String,
  fatherOccupation: String,
  fatherDesignation: String,
  fatherAge: String,
  fatherMobile: String,
  motherName: String,
  motherOccupation: String,
  motherDesignation: String,
  motherAge: String,
  motherMobile: String,
  guardianName: String,
  enrollmentNo: String,
  stream: String,
  examName: String,
  examRank: String
});

module.exports = mongoose.model('Student', StudentSchema);
