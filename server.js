const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
app.use(express.json());

// Routes
app.use("/api", routes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://piyush:admin123@cluster0.l4kcdbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");

  const PORT = process.env.PORT || 10000; // Render default port
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => console.error("MongoDB connection error:", err));
