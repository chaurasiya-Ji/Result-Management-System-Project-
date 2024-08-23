import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

//routs import
import userRouter from "./routes/user.routs.js";

app.get('/', (req, res)=>{
  res.send("ashish")
})

//route declaration 
app.use("/api/v1/users", userRouter);

//http:localhost:8000/api/v1/users/registor
import uploadMarks from "./routes/upload.routs.js";
app.use("/api/v1/upload",uploadMarks);

import showResult from './routes/result.routs.js'

app.use("/api/v1/results",showResult);

export { app }; 
