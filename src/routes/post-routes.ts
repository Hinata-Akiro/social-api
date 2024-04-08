import express from 'express';
import { createNewPost, getFeedPostsController } from '../posts/controller/index';
import { authGuard } from '../middleware/auth';
import { validatePost } from '../utils/validator';
import upload from '../middleware/multer';


const postRouter = express.Router();

postRouter.post('/',authGuard, validatePost,  upload.single('image'),createNewPost);


postRouter.get('/feed/posts', authGuard, getFeedPostsController);

export default postRouter;
