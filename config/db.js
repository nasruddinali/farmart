const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });

  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = connectDB;