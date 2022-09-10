const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/chat";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB database Connected !`);
  } catch (error) {
    console.log("cannot connect to database ------", error);
  }
};

module.exports = connectDB;
