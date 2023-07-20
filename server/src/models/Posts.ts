import mongoose, { Schema, Document, Model } from "mongoose";

interface IComment extends Document {
  text: string;
  date: Date;
  user: mongoose.Types.ObjectId;
  username: string;
  likes: mongoose.Types.ObjectId[];
  post: mongoose.Types.ObjectId;
}

interface IPost extends Document {
  text: string;
  date: Date;
  user: mongoose.Types.ObjectId;
  username: string;
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
}

const CommentSchema: Schema<IComment> = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
});

const PostSchema: Schema<IPost> = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [CommentSchema],
});

const PostModel: Model<IPost> = mongoose.model<IPost>("Post", PostSchema);
const CommentModel: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  CommentSchema
);

export { PostModel, CommentModel };
