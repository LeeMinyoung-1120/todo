import mongoose from 'mongoose';

// MongoDB 연결
const connectDB = async () => {
  try {
    const MONGODB_URL =
      process.env.MONGO_URI ||
      process.env.MONGODB_URL ||
      'mongodb://localhost:27017/todoapp';
    await mongoose.connect(MONGODB_URL);
    console.log(`MongoDB connected successfully (${process.env.NODE_ENV})`);
    console.log(`Connected to: ${mongoose.connection.host}`);
    console.log(`Database: ${mongoose.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;