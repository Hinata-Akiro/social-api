import mongoose, { Schema } from "mongoose";
import { ILike } from "../interface";

const likeSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },{
    timestamps: true
  });
  
  const Like = mongoose.model<ILike>('Like', likeSchema);
  
  export default Like;