const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;