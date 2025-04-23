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

// Import Routes
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

// Mount routes
app.use("/api/auth", authRoutes);                       // ✅ Login route
app.use("/api/students", studentRoutes);                // ✅ Students: list, create, update
app.use("/api/admins", adminRoutes);                    // ✅ Admin operations

app.use("/api/attendance", attendanceRoutes);           // ✅ All attendance
app.use("/api/fees", feesRoutes);                       // ✅ All fees
app.use("/api/marks", marksRoutes);                     // ✅ All marks

app.use("/api/notices", noticeRoutes);                  // ✅ All notices
app.use("/api/homework", homeworkRoutes);               // ✅ All homework
app.use("/api/classwork", classworkRoutes);             // ✅ All classwork
app.use("/api/gallery", galleryRoutes);                 // ✅ All gallery

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
