const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// LOGIN route for admins
router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  try {
    const admin = await Admin.findOne({ roll, password });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
