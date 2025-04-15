// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const port = process.env.PORT || 5051;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB.'))
.catch(err => console.error('❌ MongoDB connection error: ', err));

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ success: true, data: students });
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch students' });
  }
});

// POST update students
app.post('/api/students', async (req, res) => {
  const students = req.body;

  try {
    const updatePromises = students.map(student => {
      const { _id, ...studentData } = student;

      if (_id) {
        return Student.findByIdAndUpdate(_id, studentData, { new: true });
      } else {
        return Student.create(studentData);
      }
    });

    await Promise.all(updatePromises);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving students:', error);
    res.status(500).json({ success: false, error: 'Failed to save students' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
