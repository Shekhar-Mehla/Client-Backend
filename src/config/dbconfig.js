import mongoose from "mongoose";
export const dbConnect = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL connection string not found");
  }
  return mongoose.connect(process.env.MONGO_URL);
};
