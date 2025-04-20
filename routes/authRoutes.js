const express = require("express");
const router = express.Router();

// Example login route
router.post("/login", (req, res) => {
  // Login logic here
  res.send("Login route");
});

// Example register route
router.post("/register", (req, res) => {
  // Register logic here
  res.send("Register route");
});

module.exports = router;
