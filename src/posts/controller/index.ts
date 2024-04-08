import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { createPost, getFeedPosts} from '../service';
import { CustomRequest } from '../../utils/custome-response';
import { cloudinary } from '../../middleware/uploading-middleware';
import { setToCache } from '../../middleware/caching-middleware';



const createNewPost = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user._id as string;;

    const document = (req as CustomRequest).file;

    let imageUrl;

    if(document){
        imageUrl = await cloudinary.uploader.upload(document?.path);
    }
    

    const response = await createPost({author: userId , ...req.body, imageUrl: imageUrl?.secure_url})

    return res.status(201).send({
        code: 201,
        msg: "post created successfully",
        data: response
    })
   } catch (error:any) {
    return next({
        code: error.code === 11000 ? 400 : 500,
        msg: error.code === 11000 
            ? `Post with ${error.keyValue.name} already exists`
            : error.message || "internal server error..., please try again"
    });
   }
};


const getFeedPostsController = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
     const userId = req.user._id as string;;
     const { skip, limit, sort } = req.query;
     const pagingOptions = {
        skip: parseInt(skip as string, 10),
        limit: parseInt(limit as string, 10),
        sort: sort as 'asc' | 'desc'
      };
      const result = await getFeedPosts(userId,pagingOptions);
      const cacheKey = req.originalUrl
      await setToCache(cacheKey,result,600)
      res.status(result.code).json(result);
    } catch (error) {
      return next({ code: 500, msg: 'internal server error, please try again later' });
    }
  };


export {createNewPost, getFeedPostsController}