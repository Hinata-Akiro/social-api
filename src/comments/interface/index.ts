import { Types } from "mongoose";

export interface IComment{
    user: Types.ObjectId;
    text: string;
  }