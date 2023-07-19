import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

export const PostModel = mongoose.model("posts", PostSchema);
