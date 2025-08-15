const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "user"], default: "user" }, 
});

module.exports = mongoose.model("User2", UserSchema);
