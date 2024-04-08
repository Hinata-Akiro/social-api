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
exports.getComments = exports.createComment = void 0;
const model_1 = __importDefault(require("../../posts/model"));
const model_2 = __importDefault(require("../model"));
const user_model_1 = __importDefault(require("../../users/models/user-model"));
const service_1 = require("../../notification/service");
function createComment(userId, text, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const post = yield model_1.default.findById(postId);
            if (!post) {
                return { code: 404, message: "Post not found" };
            }
            const user = yield user_model_1.default.findById(userId);
            const comment = yield model_2.default.create({ user: userId, text: text });
            yield post.comments.push(comment._id);
            yield post.save();
            yield (0, service_1.createNotification)("Comment on post", `${user === null || user === void 0 ? void 0 : user.name} commented on your post`, post.author.toString());
            return { code: 200, message: "comment added successfully" };
        }
        catch (err) {
            return { code: 404, message: "Failed to create comment" };
        }
    });
}
exports.createComment = createComment;
function getComments(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield model_1.default.findById(postId);
        return (post === null || post === void 0 ? void 0 : post.comments) || [];
    });
}
exports.getComments = getComments;
