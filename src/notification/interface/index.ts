import { Types } from "mongoose";

export interface INotification  {
    userId: Types.ObjectId;
    title: string;
    message: string;
    read?: boolean;
}