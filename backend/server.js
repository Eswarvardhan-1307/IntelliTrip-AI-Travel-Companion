const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// ======================
// Route Imports
// ======================
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const tripRoutes = require("./routes/tripRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const eventRoutes = require("./routes/eventRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const smartPlannerRoutes = require("./routes/smartPlannerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

// ======================
// Middleware
// ======================
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================
// MongoDB Connection
// ======================
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
  });

// ======================
// API Routes
// ======================
app.use("/api/auth", authRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/trips", tripRoutes);

app.use("/api/itinerary", itineraryRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/weather", weatherRoutes);

app.use("/api/smart-planner", smartPlannerRoutes);

app.use("/api/reviews", reviewRoutes);

// ======================
// Health Check Route
// ======================
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
  });
});

// ======================
// 404 Route Handler
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================
// Global Error Handler
// ======================
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : undefined,
  });
});

// ======================
// Server Port
// ======================
const PORT = process.env.PORT || 5000;

// ======================
// Start Server
// ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
