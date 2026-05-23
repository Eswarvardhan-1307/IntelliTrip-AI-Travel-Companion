const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Support either MONGODB_URL (used in this project) or the common MONGODB_URI
    const mongoUri = process.env.MONGODB_URL || process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error("❌ MONGODB_URL or MONGODB_URI is missing in your .env file!");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
