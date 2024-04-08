"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../comments/controller/index");
const auth_1 = require("../middleware/auth");
const validator_1 = require("../utils/validator");
const commentRouter = express_1.default.Router();
commentRouter.post('/:postId', auth_1.authGuard, validator_1.validateComment, index_1.createCommentController);
commentRouter.get('/posts/:postId/comments', index_1.getCommentsController);
exports.default = commentRouter;
