const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const studentRoutes = require("./studentRoutes");
const noticeRoutes = require("./noticeRoutes");

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/notices", noticeRoutes);

module.exports = router;
