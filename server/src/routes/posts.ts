import express from "express";
import mongoose from "mongoose";
import { verifyToken } from "./users.js";
import { PostModel, CommentModel } from "../models/Posts.js";
import { UserModel } from "../models/Users.js";
import { Request, Response } from "express";

const router = express.Router();

// get all posts
router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await PostModel.find({});

    res.json(response);
  } catch (error) {
    res.json({ message: error });
  }
});

// get a post by id
router.get("/:postID", async (req: Request, res: Response) => {
  try {
    const response = await PostModel.findById(req.params.postID);
    res.json(response);
  } catch (error) {
    res.json({ message: error });
  }
});

// new post
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

// new comment
router.put("/comment", verifyToken, async (req: Request, res: Response) => {
  const { postID, userID, text } = req.body;

  const user = await UserModel.findById(userID);

  if (!user) return res.json({ message: "User does not exist" });

  const comment = new CommentModel({
    text: text,
    user: userID,
    username: user.username,
    post: postID,
  });

  try {
    await PostModel.findOneAndUpdate(
      { _id: postID },
      { $push: { comments: comment } }
    );
    res.json({ message: "Comment added" });
  } catch (error) {
    res.json({ message: error });
  }
});

// get comments from post using postID
router.get("/comments/:postID", async (req: Request, res: Response) => {
  try {
    const response = await PostModel.findById(req.params.postID);
    res.json(response?.comments);
  } catch (error) {
    res.json({ message: error });
  }
});

// get a list of post objects that user has liked
router.get("/likes/:userID", async (req: Request, res: Response) => {
  let likesArray = [];

  try {
    const response = await UserModel.findById(req.params.userID);
    const likes = response?.likes;
    if (!likes) return res.json({ message: "User has not liked any posts" });
    for (let i = 0; i < likes?.length; i++) {
      likesArray.push(await PostModel.findById(likes[i]));
    }

    res.json(likesArray);
  } catch (error) {
    res.json({ message: error });
  }
});

export { router as postRouter };
