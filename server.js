require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const Student = require('./models/Student');
const Notice = require('./models/Notice'); // ✅ NEW

const app = express();
const port = process.env.PORT || 5051;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ✅ Serve uploads publicly
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB.'))
.catch(err => console.error('❌ MongoDB connection error: ', err));

// ✅ GET all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find({});
    res.json({ success: true, data: students });
  } catch (error) {
    console.error('❌ Error fetching students:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch students' });
  }
});

// ✅ POST update/add students
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
// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/notices');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ POST /api/notices - upload a notice
app.post('/api/notices', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    let fileUrl = null;
    let fileType = null;

    if (req.file) {
      fileUrl = `${req.protocol}://${req.get('host')}/uploads/notices/${req.file.filename}`;
      fileType = req.file.mimetype.includes('pdf') ? 'pdf' : 'image';
    }

    const notice = new Notice({ title, description, fileUrl, fileType });
    await notice.save();

    res.json({ success: true, notice });
  } catch (error) {
    console.error('❌ Error posting notice:', error);
    res.status(500).json({ success: false, error: 'Failed to post notice' });
  }
});

// ✅ GET /api/notices - fetch all notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json({ success: true, notices });
  } catch (error) {
    console.error('❌ Error fetching notices:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch notices' });
  }
});



app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
