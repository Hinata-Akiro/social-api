import { NextFunction, Request, Response } from 'express';
import { likePost, unlikePost, getLikeCount } from '../service/index';
import mongoose from 'mongoose';

export const likePostController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;
    if (!postId ||!mongoose.Types.ObjectId.isValid(postId)) {
      return next({ code: 400, msg: 'Invalid post ID' });
  }
    const userId = req.user._id as string;;
    await likePost(userId, postId);
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error:any) {
    return next({ code: 500, msg: 'internal server error, please try again later' });
  }
};

export const unlikePostController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;
    if (!postId ||!mongoose.Types.ObjectId.isValid(postId)) {
      return next({ code: 400, msg: 'Invalid post ID' });
  }
    const userId = req.user._id as string;;
    await unlikePost(userId, postId);
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error:any) {
    return next({ code: 500, msg: 'internal server error, please try again later' });
  }
};

export const getLikeCountController = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;
    if (!postId ||!mongoose.Types.ObjectId.isValid(postId)) {
      return next({ code: 400, msg: 'Invalid post ID' });
  }
    const likeCount = await getLikeCount(postId);
    res.status(200).json({ likeCount });
  } catch (error: any) {
    return next({ code: 500, msg: 'internal server error, please try again later' });
  }
};
