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
const router = express_1.default.Router();
exports.postRouter = router;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield Posts_js_1.PostModel.find({});
        res.json(response);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
router.post("/", users_js_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Posts_js_1.PostModel({
        text: req.body.text,
        user: req.body.user,
        username: req.body.username,
    });
    // q: how to cast user to mongoose.Schema.Types.ObjectId
    // a"
    try {
        const response = yield post.save();
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
}));
