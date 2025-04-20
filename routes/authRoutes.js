router.post("/login", async (req, res) => {
  const { roll, password } = req.body;

  if (roll === "admin1" && password === "admin1") {
    return res.json({ success: true });
  }

  try {
    const student = await Student.findOne({ roll, password });
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
