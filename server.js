// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
const port = process.env.PORT || 5051;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB.'))
.catch(err => console.error('MongoDB connection error: ', err));

// GET: Retrieve all student records
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find({});
        // Map _id to id for the frontend, if needed.
        const studentsData = students.map(student => ({
            id: student._id,
            name: student.name,
            email: student.email,
            mobile: student.mobile,
            address: student.address,
            father_name: student.father_name,
            father_phone: student.father_phone,
            mother_name: student.mother_name,
            mother_phone: student.mother_phone
        }));
        res.json({ success: true, data: studentsData });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch students' });
    }
});

// POST: Update student records (expects an array of student objects)
app.post('/api/students', async (req, res) => {
    const students = req.body;
  
    try {
      const updatePromises = students.map(student => {
        const {
          id,
          ...studentData
        } = student;
  
        if (id) {
          // Update existing student
          return Student.findByIdAndUpdate(id, studentData, { new: true });
        } else {
          // Create new student
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
    console.log(`Server running on port ${port}`);
});
