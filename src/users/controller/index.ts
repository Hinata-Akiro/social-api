import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { createToken, hashPassword } from '../../utils/helper';
import { createUserService,followUser,loginUserService, unFollowUser } from '../service';
import mongoose from 'mongoose';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const response = await createUserService(req.body);
    return res.status(response.code).send(response);
  } catch (error:any) {
    return res.status(400).json({ msg: error.errors });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { code, msg, user } = await loginUserService(req.body);

    if(code === 200 && user) {
      const token = await createToken(user._id);
      return res.status(code).send({ msg, name:user.name , token});
    }else if (code === 400){
      return res.status(code).send({ msg });
    }
  } catch (error) {
    return next({ code: 500, msg: "Internal Server Error", error });
  }
}

const followUserController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const {targetUserId } = req.params;
    if (!targetUserId ||!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return next({ code: 400, msg: 'Invalid targetUserId' });
  }
    const userId = req.user?._id as string;
    const followResult = await followUser(userId, targetUserId);

    if (followResult.code === 200) {
      res.status(200).json({ message: 'Successfully Followed User' });
    } else {
      res.status(followResult.code).json({ message: followResult.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to follow user' });
  }
};

const unFollowUserController = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const {targetUserId } = req.params;
    if (!targetUserId ||!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return next({ code: 400, msg: 'Invalid targetUserId' });
  }
    const userId = req.user._id as string;;
    const unFollowResult = await unFollowUser(userId, targetUserId);

    if (unFollowResult.code === 200) {
      res.status(200).json({ message: 'Successfully Unfollowed User' });
    } else {
      res.status(unFollowResult.code).json({ message: unFollowResult.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to unfollow user' });
  }
};



export  {register, login, unFollowUserController, followUserController};
