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
exports.getFeedPosts = exports.createPost = void 0;
const model_1 = __importDefault(require("../model"));
const user_model_1 = __importDefault(require("../../users/models/user-model"));
const pagination_1 = require("../../utils/pagination");
const createPost = (createPostData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.default.create(createPostData);
});
exports.createPost = createPost;
const getFeedPosts = (userId, pagingOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.findById(userId).select('following').lean();
        const following = (users === null || users === void 0 ? void 0 : users.following) || [];
        const feedPosts = yield model_1.default.aggregate([
            { $match: { author: { $in: following } } },
            { $sort: { createdAt: (0, pagination_1.getSortObject)((pagingOptions === null || pagingOptions === void 0 ? void 0 : pagingOptions.sort) || "asc") } },
            { $skip: (pagingOptions === null || pagingOptions === void 0 ? void 0 : pagingOptions.skip) || 0 },
            { $limit: (pagingOptions === null || pagingOptions === void 0 ? void 0 : pagingOptions.limit) || 10 },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'authorInfo'
                }
            },
            { $unwind: '$authorInfo' },
            {
                $lookup: {
                    from: 'comments',
                    localField: 'comments',
                    foreignField: '_id',
                    as: 'commentsInfo'
                }
            },
            {
                $project: {
                    _id: 1,
                    author: '$authorInfo.name',
                    text: 1,
                    imageUrl: 1,
                    comments: { $map: { input: '$commentsInfo', as: 'comment', in: { user: '$$comment.user', text: '$$comment.text' } } },
                    commentsCount: { $size: '$commentsInfo' },
                    likesCount: {
                        $cond: {
                            if: { $eq: [{ $size: '$likes' }, 0] },
                            then: 0,
                            else: { $size: '$likes' }
                        }
                    }
                }
            },
            { $sort: { createdAt: -1 } }
        ]);
        return feedPosts.length > 0
            ? { code: 200, message: 'Posts found', data: feedPosts }
            : { code: 200, msg: 'No posts found', data: [] };
    }
    catch (error) {
        return { code: 400, message: error.message || 'Failed to get feed posts' };
    }
});
exports.getFeedPosts = getFeedPosts;
