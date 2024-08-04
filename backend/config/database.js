import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("datatBase conected");
    })
    .catch((error) => {
      console.log("database connection error: " + error);
    });
};

export default connectDB;
