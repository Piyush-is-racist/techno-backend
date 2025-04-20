const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  roll: String,
  name: String,
  year: String,
  marks: {
    sem1: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem2: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem3: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem4: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem5: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem6: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem7: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
    sem8: { ca1: Number, ca2: Number, ca3: Number, ca4: Number },
  }
});

module.exports = mongoose.model("Marks", marksSchema);
