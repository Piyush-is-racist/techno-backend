const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
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

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/students", studentRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/students/notices", noticeRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/students/homework", homeworkRoutes);
app.use("/api/students/classwork", classworkRoutes);
app.use("/api/students/gallery", galleryRoutes);


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
