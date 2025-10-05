// to connect to mongoDB database

import mongoose from "mongoose";

export const connectMongoDB = async (connectionString) => {
  const connection = await mongoose.connect(connectionString);
  console.log("MongoDB connected successfully");
  return connection
};