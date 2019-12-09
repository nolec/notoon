import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
import "./db";
import userRouter from "./routes/users";
//--------------------------------------------------
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//--------------------------------------------------
app.use("/api/users", userRouter);
//--------------------------------------------------
const port = process.env.PORT || 5000;
const handleListening = () => {
  console.log(`We listened this PORT : ${port} please`);
};
app.listen(port, handleListening);
