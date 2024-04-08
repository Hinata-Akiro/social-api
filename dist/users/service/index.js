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
exports.unFollowUser = exports.followUser = exports.loginUserService = exports.createUserService = void 0;
const helper_1 = require("../../utils/helper");
const user_model_1 = __importDefault(require("../models/user-model"));
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createUser = new user_model_1.default(user);
        const results = yield createUser.save();
        return results.errors
            ? {
                code: 500,
                msg: "The server could not process your request at the moment",
            }
            : { code: 201, msg: `You have successfully signed up`, data: results };
    }
    catch (error) {
        if (error.code == 11000)
            return { code: 400, msg: `User with email ${user.email} already exisit` };
        return { code: 400, msg: error.message };
    }
});
exports.createUserService = createUserService;
//login a user 
const loginUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: data.email });
        if (!user)
            return { code: 400, msg: `User with email ${data.email} does not exist` };
        const isMatch = yield (0, helper_1.comparePassword)(user.password, data.password);
        if (!isMatch)
            return { code: 400, msg: `Password does not match` };
        return { code: 200, msg: `You have successfully logged in`, user: user };
    }
    catch (error) {
        return { code: 400, msg: error.message };
    }
});
exports.loginUserService = loginUserService;
const followUser = (userId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (userId === targetUserId) {
            return { code: 400, message: "You cannot follow yourself." };
        }
        const targetUser = yield user_model_1.default.findById(targetUserId);
        if (!targetUser) {
            return { code: 404, message: "The user you are trying to follow does not exist. Please make sure you have entered the correct user ID." };
        }
        yield user_model_1.default.findByIdAndUpdate(userId, { $addToSet: { following: targetUser._id } });
        yield user_model_1.default.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });
        return { code: 200, message: "Successfully Followed User" };
    }
    catch (error) {
        return { code: 400, message: "Unable to follow user" || error.message };
    }
});
exports.followUser = followUser;
const unFollowUser = (userId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const targetUser = yield user_model_1.default.findById(targetUserId);
        if (!targetUser) {
            return { code: 404, message: "The user you are trying to unfollow does not exist. Please make sure you have entered the correct user ID." };
        }
        yield user_model_1.default.findByIdAndUpdate(userId, { $pull: { following: targetUserId } });
        yield user_model_1.default.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });
        return { code: 200, message: "Successfully Unfollowed User" };
    }
    catch (error) {
        return { code: 400, message: "Unable to unfollow user" || error.message };
    }
});
exports.unFollowUser = unFollowUser;
