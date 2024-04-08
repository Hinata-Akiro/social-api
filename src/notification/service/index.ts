import Notification from "../model/notification-schema";
import { INotification } from "../interface";
import { Server, Socket } from 'socket.io'
import mongoose, { Types } from "mongoose";

const createNotification = async (
    title: string,
    message: string,
    userId: string,
  )=>{
       await Notification.create({
        title,
        message,
        userId,
      });
  }

const markNotificationAsRead = async(userId:string, notificationId:string) => {
   try {
    const readNotification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
      );
      return {code: 200 , massage: "notification read"}
   } catch (error) {
    return {code:404, massage: " notifications not found"}
   }
}

const getUserNotifications = async (socket: Socket, userId: string) => {
  try {
    const notifications = await Notification.find({ userId } as mongoose.FilterQuery<INotification>)
      .sort({ createdAt: -1 })
      .sort({ read: 1 });

      if (notifications.length === 0) {

        socket.emit('userNotification', {
          code:404,
          message: 'No notifications found for the user',
          data: notifications,
        });
      } else {
        socket.emit('userNotification', {
          code:200,
          message: 'all user notification',
          data: notifications,
        })
      }
  } catch (error:any) {
    socket.emit('userNotification', {
      code:500,
      message: 'unable to get user notifications',
      data: error.message,
    });
  }
}

export {
    createNotification,
    markNotificationAsRead,
    getUserNotifications
}