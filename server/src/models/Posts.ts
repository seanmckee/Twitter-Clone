import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
