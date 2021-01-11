const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String },
  block: { type: Boolean, default: "false" },
  role: { type: String, default: "user" },
  enum: ["user", "client"],
});
module.exports = mongoose.model("User", userSchema);
