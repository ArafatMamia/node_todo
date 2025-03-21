const mongoose = require('mongoose');
require('dotenv').config()

const mongoURL = process.env.mongoURL
// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Connected to Todo_app MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the connectDB function
module.exports = connectDB;