import express from 'express';
import { createCommentController, getCommentsController } from '../comments/controller/index';
import { authGuard } from '../middleware/auth';
import { validateComment } from '../utils/validator';

const commentRouter = express.Router();

commentRouter.post('/:postId',authGuard,validateComment, createCommentController);

commentRouter.get('/posts/:postId/comments', getCommentsController);

export default commentRouter;