const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  roll: String,
  dob: String,
  name: String,
  phone: String,
  email: String,
  year: String,

  gender: String,
  caste: String,
  nationality: String,
  bloodGroup: String,
  address: { type: String, required: true },
  district: String,
  state: String,
  pin: String,
  
  fatherName: String,
  fatherOccupation: String,
  fatherDesignation: String,
  fatherAge: String,
  fatherMobile: String,
  fatherPan: String,
  fatherPassport: String,
  fatherAddress: { type: String, required: true },
  fatherPin: String,
  fatherDistrict: String,

  
  motherName: String,
  motherOccupation: String,
  motherDesignation: String,
  motherAge: String,
  motherMobile: String,
  motherPan: String,
  motherPassport: String,
  motherAddress: { type: String, required: true },
  motherPin: String,
  motherDistrict: String,

  guardianName: String,
  enrollmentNo: String,
  stream: String,
  examName: String,
  examRank: String,

  studentPan: String,
  studentPassport: String,

  password: String,

  marks: Object,

  fees: Object,
  attendance: Object
});

module.exports = mongoose.model("Student", studentSchema);
