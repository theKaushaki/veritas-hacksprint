const mongoose = require('mongoose');
const startupFunctions = require('./models/databasePreconfigs');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL, {
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });

    startupFunctions();

    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
