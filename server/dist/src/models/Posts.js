"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Comment" }],
});
const PostSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Comment" }],
});
