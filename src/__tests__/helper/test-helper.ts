import User from "../../users/models/user-model";
import { IUser } from "../../users/interface";
import { IComment } from "../../comments/interface";
import Comment from "../../comments/model";
import Post from "../../posts/model";
import Like from "../../likes/model";
import { IPost } from "../../posts/interface";
import { ILike } from "../../likes/interface";

const createUser = (payload: IUser) => {
    return User.create(payload);
}

const createComment = (payload: IComment) => {
    return Comment.create(payload);
}

const createPost = (payload: IPost) => {
    return Post.create(payload);
}

const deleteUsers = () => {
    return User.deleteMany({});
}

const deletePost = () => {
    return Post.deleteMany({});
}

const deleteComment = () => {
    return Comment.deleteMany({});
}

const createLikes = (payload: ILike) => {
    return Like.create(payload);
}

const deleteLikes = () => {
    return Like.deleteMany({});
}

export { createUser,deleteUsers
     , createComment, deleteComment
     , createPost, deletePost
     , createLikes, deleteLikes
};