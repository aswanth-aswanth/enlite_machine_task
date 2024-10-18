import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/enlite"
    );
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log("Error : ", error);
    process.exit(1);
  }
};
