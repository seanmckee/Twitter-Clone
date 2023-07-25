"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_js_1 = require("./users.js");
const Posts_js_1 = require("../models/Posts.js");
const Users_js_1 = require("../models/Users.js");
const router = express_1.default.Router();
exports.postRouter = router;
// get all posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Posts_js_1.PostModel.find({});
        res.json(response);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// get a post by id
router.get("/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Posts_js_1.PostModel.findById(req.params.postID);
        res.json(response);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// new post
router.post("/", users_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Posts_js_1.PostModel({
        text: req.body.text,
        user: req.body.user,
        username: req.body.username,
    });
    try {
        const response = yield post.save();
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
}));
// like a post
router.put("/like", users_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postID, userID } = req.body;
    const post = yield Posts_js_1.PostModel.findById(postID);
    if (!post)
        return res.json({ message: "Post does not exist" });
    const user = yield Users_js_1.UserModel.findById(userID);
    if (!user)
        return res.json({ message: "User does not exist" });
    try {
        yield user.updateOne({ $push: { likes: postID } });
        yield post.updateOne({ $push: { likes: userID } });
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// unlike a post
router.put("/unlike", users_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postID, userID } = req.body;
    const post = yield Posts_js_1.PostModel.findById(postID);
    if (!post)
        return res.json({ message: "Post does not exist" });
    const user = yield Users_js_1.UserModel.findById(userID);
    if (!user)
        return res.json({ message: "User does not exist" });
    try {
        yield user.updateOne({ $pull: { likes: postID } });
        yield post.updateOne({ $pull: { likes: userID } });
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// new comment
router.put("/comment", users_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postID, userID, text } = req.body;
    const user = yield Users_js_1.UserModel.findById(userID);
    if (!user)
        return res.json({ message: "User does not exist" });
    const comment = new Posts_js_1.CommentModel({
        text: text,
        user: userID,
        username: user.username,
        post: postID,
    });
    try {
        yield Posts_js_1.PostModel.findOneAndUpdate({ _id: postID }, { $push: { comments: comment } });
        res.json({ message: "Comment added" });
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// get comments from post using postID
router.get("/comments/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Posts_js_1.PostModel.findById(req.params.postID);
        res.json(response === null || response === void 0 ? void 0 : response.comments);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// get a list of post objects that user has liked
router.get("/likes/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let likesArray = [];
    try {
        const response = yield Users_js_1.UserModel.findById(req.params.userID);
        const likes = response === null || response === void 0 ? void 0 : response.likes;
        if (!likes)
            return res.json({ message: "User has not liked any posts" });
        for (let i = 0; i < (likes === null || likes === void 0 ? void 0 : likes.length); i++) {
            likesArray.push(yield Posts_js_1.PostModel.findById(likes[i]));
        }
        res.json(likesArray);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
