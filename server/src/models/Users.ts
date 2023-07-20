import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  likes: mongoose.Types.ObjectId[];
  retweets: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  "users",
  UserSchema
);
