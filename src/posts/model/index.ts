import mongoose, { Schema, Document } from 'mongoose';
import { IPost } from '../interface';

const postSchema: Schema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    imageUrl: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},{
    timestamps: true
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
