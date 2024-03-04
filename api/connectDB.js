import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log("Connected to mongoDB");
};

export default connectDB;
