const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Route imports
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feesRoutes = require("./routes/feesRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const marksRoutes = require("./routes/marksRoutes");
const homeworkRoutes = require("./routes/homeworkRoutes");
const classworkRoutes = require("./routes/classworkRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

// Mount API routes
app.use("/api/auth", authRoutes);                          // 🔐 Login/Register
app.use("/api/students", studentRoutes);                   // 👨‍🎓 Students CRUD
app.use("/api/admins", adminRoutes);                       // 🧑‍💼 Admin functions
app.use("/api/attendance", attendanceRoutes);              // 🗓️ Attendance
app.use("/api/fees", feesRoutes);                          // 💸 Fees
app.use("/api/students/notices", noticeRoutes);            // 📢 Notices
app.use("/api/marks", marksRoutes);                        // 📝 Marks
app.use("/api/students/homework", homeworkRoutes);         // 🏠 Homework
app.use("/api/students/classwork", classworkRoutes);       // 📚 Classwork
app.use("/api/students/gallery", galleryRoutes);           // 🖼️ Gallery

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");

  const PORT = process.env.PORT || 10000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
