import { IPost } from "../interface";
import Post from "../model";
import { deleteDocument } from "../../utils/crud";
import User from "../../users/models/user-model";
import { getSortObject, PagingOptions } from "../../utils/pagination";


const createPost = async (createPostData: IPost) => {
    return await Post.create(createPostData);
};

  const getFeedPosts = async (userId: string, pagingOptions?: PagingOptions) => {
    try {
      const users = await User.findById(userId).select('following').lean();
      const following = users?.following || [];
  
      const feedPosts = await Post.aggregate([
        { $match: { author: { $in: following } } },
        { $sort: { createdAt: getSortObject(pagingOptions?.sort || "asc") } },
            { $skip: pagingOptions?.skip || 0 },
            { $limit: pagingOptions?.limit || 10 },
        {
          $lookup: {
            from: 'users',
            localField: 'author',
            foreignField: '_id',
            as: 'authorInfo'
          }
        },
        { $unwind: '$authorInfo' },
        {
          $lookup: {
            from: 'comments',
            localField: 'comments',
            foreignField: '_id',
            as: 'commentsInfo'
          }
        },
        {
          $project: {
            _id: 1,
            author: '$authorInfo.name',
            text: 1,
            imageUrl: 1,
            comments: { $map: { input: '$commentsInfo', as: 'comment', in: { user: '$$comment.user', text: '$$comment.text' } } },
            commentsCount: { $size: '$commentsInfo' },
            likesCount: {
              $cond: {
                if: { $eq: [{ $size: '$likes' }, 0] },
                then: 0,
                else: { $size: '$likes' }
              }
            }
          }
        },
        { $sort: { createdAt: -1 } }
      ]);
  
      return feedPosts.length > 0
        ? { code: 200, message: 'Posts found', data: feedPosts }
        : { code: 200, msg: 'No posts found', data: [] };
    } catch (error: any) {
      return { code: 400, message: error.message || 'Failed to get feed posts' };
    }
  };


export { createPost , getFeedPosts};