import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./users.js";
import { PostModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";
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

  try {
    const response = await post.save();
    res.json(response);
  } catch (error) {
    console.error(error);
    res.json({ message: error });
  }
});

// like a post
router.put("/like", verifyToken, async (req: Request, res: Response) => {
  const { postID, userID } = req.body;
  const post = await PostModel.findById(postID);
  if (!post) return res.json({ message: "Post does not exist" });
  const user = await UserModel.findById(userID);
  if (!user) return res.json({ message: "User does not exist" });

  try {
    await user.updateOne({ $push: { likes: postID } });
    await post.updateOne({ $push: { likes: userID } });
  } catch (error) {
    res.json({ message: error });
  }
});

// unlike a post
router.put("/unlike", verifyToken, async (req: Request, res: Response) => {
  const { postID, userID } = req.body;
  const post = await PostModel.findById(postID);
  if (!post) return res.json({ message: "Post does not exist" });
  const user = await UserModel.findById(userID);
  if (!user) return res.json({ message: "User does not exist" });

  try {
    await user.updateOne({ $pull: { likes: postID } });
    await post.updateOne({ $pull: { likes: userID } });
  } catch (error) {
    res.json({ message: error });
  }
});

export { router as postRouter };
