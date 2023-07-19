"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    username: { type: String, required: true },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" }],
    parent: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" },
});
exports.PostModel = mongoose_1.default.model("posts", PostSchema);
