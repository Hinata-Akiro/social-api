"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLikes = exports.createLikes = exports.deletePost = exports.createPost = exports.deleteComment = exports.createComment = exports.deleteUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../../users/models/user-model"));
const model_1 = __importDefault(require("../../comments/model"));
const model_2 = __importDefault(require("../../posts/model"));
const model_3 = __importDefault(require("../../likes/model"));
const createUser = (payload) => {
    return user_model_1.default.create(payload);
};
exports.createUser = createUser;
const createComment = (payload) => {
    return model_1.default.create(payload);
};
exports.createComment = createComment;
const createPost = (payload) => {
    return model_2.default.create(payload);
};
exports.createPost = createPost;
const deleteUsers = () => {
    return user_model_1.default.deleteMany({});
};
exports.deleteUsers = deleteUsers;
const deletePost = () => {
    return model_2.default.deleteMany({});
};
exports.deletePost = deletePost;
const deleteComment = () => {
    return model_1.default.deleteMany({});
};
exports.deleteComment = deleteComment;
const createLikes = (payload) => {
    return model_3.default.create(payload);
};
exports.createLikes = createLikes;
const deleteLikes = () => {
    return model_3.default.deleteMany({});
};
exports.deleteLikes = deleteLikes;
