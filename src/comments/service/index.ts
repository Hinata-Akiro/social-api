import Post from "../../posts/model";
import Comment from "../model";
import User from "../../users/models/user-model";
import { createNotification } from "../../notification/service";

export async function createComment(userId: string, text: string, postId: string) {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return {code: 404, message: "Post not found"};
    }

    const user = await User.findById(userId);


    const comment = await Comment.create({ user: userId, text: text });
    await post.comments.push(comment._id);
    await post.save();

    await createNotification("Comment on post",`${user?.name} commented on your post`,post.author.toString() as string);

    return {code: 200, message: "comment added successfully"};
  } catch (err) {
    return {code: 404, message: "Failed to create comment"};
  }
}

export async function getComments(postId: string) {
  const post = await Post.findById(postId);
  return post?.comments || [];
}
