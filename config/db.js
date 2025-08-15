const mongoose =require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
                 
    });

    console.log("MongoDB connected to samadhaan_db");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = connectDB;
