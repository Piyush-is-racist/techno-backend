const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  roll: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  months: {
    jan: { type: String, default: "" },
    feb: { type: String, default: "" },
    mar: { type: String, default: "" },
    apr: { type: String, default: "" },
    may: { type: String, default: "" },
    jun: { type: String, default: "" },
    jul: { type: String, default: "" },
    aug: { type: String, default: "" },
    sep: { type: String, default: "" },
    oct: { type: String, default: "" },
    nov: { type: String, default: "" },
    dec: { type: String, default: "" }
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
