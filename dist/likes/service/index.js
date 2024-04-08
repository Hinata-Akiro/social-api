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
exports.getLikeCount = exports.unlikePost = exports.likePost = void 0;
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("../model"));
const model_2 = __importDefault(require("../../posts/model"));
const service_1 = require("../../notification/service");
const user_model_1 = __importDefault(require("../../users/models/user-model"));
function likePost(userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield model_2.default.findById(postId);
            if (!post) {
                return { code: 404, message: "Post not found" };
            }
            const user = yield user_model_1.default.findById(userId);
            if (!post.likes.includes(new mongoose_1.Types.ObjectId(userId))) {
                const like = yield model_1.default.create({ user: userId });
                yield post.likes.push(like.user);
                yield (0, service_1.createNotification)("Like on post", `${user === null || user === void 0 ? void 0 : user.name} liked your post`, post === null || post === void 0 ? void 0 : post.author.toString());
                yield post.save();
            }
        }
        catch (err) {
            return { code: 400, message: "Failed to like post" };
        }
    });
}
exports.likePost = likePost;
function unlikePost(userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield model_2.default.findByIdAndUpdate(postId, {
                $pull: { likes: userId }
            }, { new: true });
            const user = yield user_model_1.default.findById(userId);
            yield (0, service_1.createNotification)("UnLike on post", `${user === null || user === void 0 ? void 0 : user.name} Unliked your post`, post === null || post === void 0 ? void 0 : post.author.toString());
            if (!post) {
                return { code: 404, message: "Post not found" };
            }
        }
        catch (err) {
            return { code: 400, message: "Failed to like post" };
        }
    });
}
exports.unlikePost = unlikePost;
function getLikeCount(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const post = yield model_2.default.findById(postId);
        return ((_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.length) || 0;
    });
}
exports.getLikeCount = getLikeCount;
