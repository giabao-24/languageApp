const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const link = process.env.dburl ;
const connectDB = async() => {
   try {
     await mongoose.connect(link);
     console.log('MongoDB connected successfully');
   }catch (error) {
    console.error('MongoDB connection error:', error);
   }
}
module.exports = connectDB;
