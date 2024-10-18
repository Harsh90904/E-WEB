const multer = require("multer");
const bcrypt = require("bcrypt");
const User = require("../modules/user_module");
const { sendOTP, sendingMail } = require("../services/mailer");

// Default email admin
const defaultAdmin = {
  email: "diyoraharsh6@gmail.com",
  isAdmin: true,
  verified: true,
};

const StoreOtp = new Map();
StoreOtp.set(defaultAdmin.email, { otp: null });

const storage = multer.diskStorage({
  destination: "product_images",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const signup = async (req, res) => {
  let { name, password, email } = req.body;
  let profile;

  if (req.file) {
    profile = req.file.path; 
  }

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    password: hashPassword,
    email,
    profile,
  });

  await newUser.save();

  // Send user data via email
  let html = `<h1>Username: ${name}</h1><h2>Email: ${email}</h2><h3>Password: ${password}</h3><img src="${req.file.path}">`;
  sendingMail(email, "New User", html);

  res.status(201).send(newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ error: "Invalid username or password" });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(401).send("Password mismatch");
  }

  const sendOtp = Math.floor(100000 + Math.random() * 900000).toString();
  StoreOtp.set(email, { otp: sendOtp });
  sendOTP(email, sendOtp);

  res.cookie("id", user._id).send({ message: "Logged in successfully, OTP sent" });
};

const verifiedotp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required");
  }

  const storedOtp = StoreOtp.get(email);
  if (!storedOtp || storedOtp.otp !== otp) {
    return res.status(401).send({ error: "Invalid OTP" });
  }

  StoreOtp.delete(email); 
  res.send({ message: "OTP verified successfully" });
};

module.exports = { signup, login, verifiedotp, upload };
