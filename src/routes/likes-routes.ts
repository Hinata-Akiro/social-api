import express from 'express';
import { likePostController, unlikePostController, getLikeCountController } from '../likes/controller/index';
import { authGuard } from '../middleware/auth';

const likeRouter = express.Router();

likeRouter.post('/posts/:postId/like',authGuard, likePostController);

likeRouter.post('/posts/:postId/unlike',authGuard, unlikePostController);

likeRouter.get('/posts/:postId/like/count', getLikeCountController);

export default likeRouter;
