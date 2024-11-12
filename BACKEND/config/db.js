const { default: mongoose } = require("mongoose");
require("dotenv").config();
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/E-WEB");
    console.log("connect to the database");
    
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
