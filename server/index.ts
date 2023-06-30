import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { userRouter } from "./src/routes/users";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const connection: any = process.env.CONNECT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect(connection);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  
});
