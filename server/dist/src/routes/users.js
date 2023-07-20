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
exports.verifyToken = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Users_js_1 = require("../models/Users.js");
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const user = yield Users_js_1.UserModel.findOne({ username });
    const mail = yield Users_js_1.UserModel.findOne({ email });
    if (user) {
        return res.json({ message: "User already exists" });
    }
    if (mail) {
        return res.json({ message: "User with given email already exists" });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new Users_js_1.UserModel({ username, email, password: hashedPassword });
    yield newUser.save();
    res.json({ message: "User Registered Successfully" });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield Users_js_1.UserModel.findOne({ email });
    if (!user) {
        return res.json({ message: "User does not exist" });
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Email or Password is Incorrect" });
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
}));
// write a route to get username from id
router.get("/username/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield Users_js_1.UserModel.findById(id);
    if (!user)
        return res.json({ message: "User does not exist" });
    try {
        res.json({ username: user.username });
    }
    catch (error) {
        res.json({ message: error });
    }
}));
// get user from id
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield Users_js_1.UserModel.findById(id);
        if (!user)
            return res.json({ message: "User does not exist" });
        res.json(user);
    }
    catch (error) {
        res.json({ message: error });
    }
}));
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, "secret", (err) => {
            if (err)
                return res.sendStatus(403);
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.verifyToken = verifyToken;
