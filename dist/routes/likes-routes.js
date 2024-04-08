"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../likes/controller/index");
const auth_1 = require("../middleware/auth");
const likeRouter = express_1.default.Router();
likeRouter.post('/posts/:postId/like', auth_1.authGuard, index_1.likePostController);
likeRouter.post('/posts/:postId/unlike', auth_1.authGuard, index_1.unlikePostController);
likeRouter.get('/posts/:postId/like/count', index_1.getLikeCountController);
exports.default = likeRouter;
