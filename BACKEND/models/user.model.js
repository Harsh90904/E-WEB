const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "CEO"],
    default: "USER",
  },
  profile: { type: String },
  number: { type: Number },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  Comment:{}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
