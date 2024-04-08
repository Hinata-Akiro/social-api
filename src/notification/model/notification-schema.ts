import mongoose, { Schema } from "mongoose";
import { INotification } from "../interface";

const notificationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true},
    message: { type: String, required: true },
    read: {
        type: Boolean,
        default: false,
      },
},{
    timestamps: true
});

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;