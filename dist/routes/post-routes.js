"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../posts/controller/index");
const auth_1 = require("../middleware/auth");
const validator_1 = require("../utils/validator");
const multer_1 = __importDefault(require("../middleware/multer"));
const postRouter = express_1.default.Router();
postRouter.post('/', auth_1.authGuard, validator_1.validatePost, multer_1.default.single('image'), index_1.createNewPost);
postRouter.get('/feed/posts', auth_1.authGuard, index_1.getFeedPostsController);
exports.default = postRouter;
