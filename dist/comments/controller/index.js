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
exports.getCommentsController = exports.createCommentController = void 0;
const index_1 = require("../service/index");
const mongoose_1 = __importDefault(require("mongoose"));
const express_validator_1 = require("express-validator");
const createCommentController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const { postId } = req.params;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        if (!postId || !mongoose_1.default.Types.ObjectId.isValid(postId)) {
            return next({ code: 400, msg: 'Invalid post ID' });
        }
        const userId = req.user._id;
        ;
        const result = yield (0, index_1.createComment)(userId, text, postId);
        if (result.code === 200) {
            res.status(200).json({ message: result.message });
        }
        else {
            res.status(result.code).json({ message: result.message });
        }
    }
    catch (error) {
        return next({ code: 500, msg: 'internal server error, please try again later' });
    }
});
exports.createCommentController = createCommentController;
const getCommentsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const comments = yield (0, index_1.getComments)(postId);
        res.status(200).json({ comments });
    }
    catch (error) {
        return next({ code: 500, msg: 'internal server error, please try again later' });
    }
});
exports.getCommentsController = getCommentsController;
