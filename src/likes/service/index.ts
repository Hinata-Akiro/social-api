import { Types } from "mongoose";
import Like from "../model";
import Post from "../../posts/model";
import { createNotification } from "../../notification/service";
import User from "../../users/models/user-model";


export async function likePost(userId: string, postId: string) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
     return {code: 404, message:"Post not found"};
    }

    const user = await User.findById(userId);

    if (!post.likes.includes(new Types.ObjectId(userId))) {
      const like = await Like.create({ user: userId });
      await post.likes.push(like.user);
      await createNotification("Like on post",`${user?.name} liked your post`,post?.author.toString() as string);
      await post.save();
    }
  } catch (err) {
    return {code: 400 , message: "Failed to like post"};
  }
}

export async function unlikePost(userId: string, postId: string) {
  try {
    const post = await Post.findByIdAndUpdate(postId, {
      $pull: { likes: userId }
    }, { new: true });
    const user = await User.findById(userId);
    await createNotification("UnLike on post",`${user?.name} Unliked your post`,post?.author.toString() as string);
    if (!post) {
        return {code: 404, message:"Post not found"};
    }
  } catch (err) {
    return {code: 400 , message: "Failed to like post"};
  }
}

export async function getLikeCount(postId: string): Promise<number> {
  const post = await Post.findById(postId);
  return post?.likes?.length || 0;
}
