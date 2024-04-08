import { NextFunction, Request, Response } from 'express';
import { createComment, getComments } from '../service/index';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

export const createCommentController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { text } = req.body;
    const {postId} = req.params

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    if (!postId ||!mongoose.Types.ObjectId.isValid(postId)) {
      return next({ code: 400, msg: 'Invalid post ID' });
  }
  
    const userId = req.user._id as string;;

    const result = await createComment(userId, text, postId);
    if (result.code === 200) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(result.code).json({ message: result.message });
    }
  } catch (error:any) {
    return next({ code: 500, msg: 'internal server error, please try again later' });
  }
};

export const getCommentsController = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  try {
    const { postId } = req.params;
    const comments = await getComments(postId);
    res.status(200).json({ comments });
  } catch (error:any) {
    return next({ code: 500, msg: 'internal server error, please try again later' });
  }
};
