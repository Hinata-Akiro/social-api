import mongoose, { Schema } from "mongoose";
import { IComment } from "../interface";

const commentSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
  },{
    timestamps: true
  });
  
  const Comment = mongoose.model<IComment>('Comment', commentSchema);
  
  export default Comment;