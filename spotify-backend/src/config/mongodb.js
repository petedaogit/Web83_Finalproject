import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connection established!");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/spotify`);
};

export default connectDB;
