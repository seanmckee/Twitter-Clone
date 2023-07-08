import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./users.js";
import { PostModel } from "../models/Posts.js";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await PostModel.find({});

    res.json(response);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
  const post = new PostModel({
    text: req.body.text,
    user: req.body.user,
    username: req.body.username,
  });
  // q: how to cast user to mongoose.Schema.Types.ObjectId
  // a"
  try {
    const response = await post.save();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

export { router as postRouter };
