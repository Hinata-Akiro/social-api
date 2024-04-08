import { Types } from "mongoose";

export interface IPost {
    _id?: string;
    author: string;
    text: string;
    imageUrl?: string;
    likes: Types.ObjectId[];
    comments: Types.ObjectId[];
}