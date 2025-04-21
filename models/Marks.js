const mongoose = require("mongoose");

const caSchema = new mongoose.Schema({
  ca1: { type: Number, default: 0 },
  ca2: { type: Number, default: 0 },
  ca3: { type: Number, default: 0 },
  ca4: { type: Number, default: 0 }
}, { _id: false });

const subjectSchema = new mongoose.Schema({
  sub1: { type: caSchema, default: () => ({}) },
  sub2: { type: caSchema, default: () => ({}) },
  sub3: { type: caSchema, default: () => ({}) },
  sub4: { type: caSchema, default: () => ({}) },
  sub5: { type: caSchema, default: () => ({}) }
}, { _id: false });

const marksSchema = new mongoose.Schema({
  roll: String,
  name: String,
  year: String,
  marks: {
    sem1: { type: subjectSchema, default: () => ({}) },
    sem2: { type: subjectSchema, default: () => ({}) },
    sem3: { type: subjectSchema, default: () => ({}) },
    sem4: { type: subjectSchema, default: () => ({}) },
    sem5: { type: subjectSchema, default: () => ({}) },
    sem6: { type: subjectSchema, default: () => ({}) },
    sem7: { type: subjectSchema, default: () => ({}) },
    sem8: { type: subjectSchema, default: () => ({}) }
  }
});

module.exports = mongoose.model("Marks", marksSchema);
