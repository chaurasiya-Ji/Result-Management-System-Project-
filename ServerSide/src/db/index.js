import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // const connectInstance = await mongoose.connect("mongodb://127.0.0.1:27017/Result_Management");
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URi}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `\nMongodb connected !! DB_NAME: ${connectInstance.connection.host}`
    );
  } catch (err) {
    console.log("mongodb conection error ", err);
    process.exit(1); 
  }
};

export default connectDB;
