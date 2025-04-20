const mongoose = require("mongoose");

const feesSchema = new mongoose.Schema({
  roll: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: String, required: true },
  semesters: {
    sem1: { type: Number, default: 0 },
    sem2: { type: Number, default: 0 },
    sem3: { type: Number, default: 0 },
    sem4: { type: Number, default: 0 },
    sem5: { type: Number, default: 0 },
    sem6: { type: Number, default: 0 },
    sem7: { type: Number, default: 0 },
    sem8: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model("Fees", feesSchema);
