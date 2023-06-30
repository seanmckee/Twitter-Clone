import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

export const UserModel = mongoose.model("users", UserSchema);
