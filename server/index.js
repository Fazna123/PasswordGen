import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import passwordRouter from "./routes/password.route.js";
import errorMiddleWare from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => console.log(error));

app.use("/api/user", userRouter);
app.use("/api/password", passwordRouter);

app.get("/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.use(errorMiddleWare);

app.listen(3000, () => {
  console.log("Server on http://localhost:3000");
});
