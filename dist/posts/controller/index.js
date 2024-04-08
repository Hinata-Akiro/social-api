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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedPostsController = exports.createNewPost = void 0;
const express_validator_1 = require("express-validator");
const service_1 = require("../service");
const uploading_middleware_1 = require("../../middleware/uploading-middleware");
const caching_middleware_1 = require("../../middleware/caching-middleware");
const createNewPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userId = req.user._id;
        ;
        const document = req.file;
        let imageUrl;
        if (document) {
            imageUrl = yield uploading_middleware_1.cloudinary.uploader.upload(document === null || document === void 0 ? void 0 : document.path);
        }
        const response = yield (0, service_1.createPost)(Object.assign(Object.assign({ author: userId }, req.body), { imageUrl: imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.secure_url }));
        return res.status(201).send({
            code: 201,
            msg: "post created successfully",
            data: response
        });
    }
    catch (error) {
        return next({
            code: error.code === 11000 ? 400 : 500,
            msg: error.code === 11000
                ? `Post with ${error.keyValue.name} already exists`
                : error.message || "internal server error..., please try again"
        });
    }
});
exports.createNewPost = createNewPost;
const getFeedPostsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user._id;
        ;
        const { skip, limit, sort } = req.query;
        const pagingOptions = {
            skip: parseInt(skip, 10),
            limit: parseInt(limit, 10),
            sort: sort
        };
        const result = yield (0, service_1.getFeedPosts)(userId, pagingOptions);
        const cacheKey = req.originalUrl;
        yield (0, caching_middleware_1.setToCache)(cacheKey, result, 600);
        res.status(result.code).json(result);
    }
    catch (error) {
        return next({ code: 500, msg: 'internal server error, please try again later' });
    }
});
exports.getFeedPostsController = getFeedPostsController;
