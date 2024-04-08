"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotifications = exports.markNotificationAsRead = exports.createNotification = void 0;
const notification_schema_1 = __importDefault(require("../model/notification-schema"));
const createNotification = (title, message, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield notification_schema_1.default.create({
        title,
        message,
        userId,
    });
});
exports.createNotification = createNotification;
const markNotificationAsRead = (userId, notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const readNotification = yield notification_schema_1.default.findByIdAndUpdate(notificationId, { read: true });
        return { code: 200, massage: "notification read" };
    }
    catch (error) {
        return { code: 404, massage: " notifications not found" };
    }
});
exports.markNotificationAsRead = markNotificationAsRead;
const getUserNotifications = (socket, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_schema_1.default.find({ userId })
            .sort({ createdAt: -1 })
            .sort({ read: 1 });
        if (notifications.length === 0) {
            socket.emit('userNotification', {
                code: 404,
                message: 'No notifications found for the user',
                data: notifications,
            });
        }
        else {
            socket.emit('userNotification', {
                code: 200,
                message: 'all user notification',
                data: notifications,
            });
        }
    }
    catch (error) {
        socket.emit('userNotification', {
            code: 500,
            message: 'unable to get user notifications',
            data: error.message,
        });
    }
});
exports.getUserNotifications = getUserNotifications;
