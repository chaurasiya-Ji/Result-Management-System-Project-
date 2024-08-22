// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("server start...", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed!! ", err);
  });

// first approch-->

// import express from "express";
// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URi}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERROR..");
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log("App is lisining on :" + process.env.PORT);
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// })();
