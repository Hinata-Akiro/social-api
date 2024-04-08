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
exports.getLikeCountController = exports.unlikePostController = exports.likePostController = void 0;
const index_1 = require("../service/index");
const mongoose_1 = __importDefault(require("mongoose"));
const likePostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return next({ code: 400, msg: 'Invalid post ID' });
        }
        const userId = req.user._id;
        ;
        yield (0, index_1.likePost)(userId, postId);
        res.status(200).json({ message: 'Post liked successfully' });
    }
    catch (error) {
        return next({ code: 500, msg: 'internal server error, please try again later' });
    }
});
exports.likePostController = likePostController;
const unlikePostController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return next({ code: 400, msg: 'Invalid post ID' });
        }
        const userId = req.user._id;
        ;
        yield (0, index_1.unlikePost)(userId, postId);
        res.status(200).json({ message: 'Post unliked successfully' });
    }
    catch (error) {
        return next({ code: 500, msg: 'internal server error, please try again later' });
    }
});
exports.unlikePostController = unlikePostController;
const getLikeCountController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return next({ code: 400, msg: 'Invalid post ID' });
        }
        const likeCount = yield (0, index_1.getLikeCount)(postId);
        res.status(200).json({ likeCount });
    }
    catch (error) {
        return next({ code: 500, msg: 'internal server error, please try again later' });
    }
});
exports.getLikeCountController = getLikeCountController;
