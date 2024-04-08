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
exports.followUserController = exports.unFollowUserController = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const helper_1 = require("../../utils/helper");
const service_1 = require("../service");
const mongoose_1 = __importDefault(require("mongoose"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const hashedPassword = yield (0, helper_1.hashPassword)(req.body.password);
        req.body.password = hashedPassword;
        const response = yield (0, service_1.createUserService)(req.body);
        return res.status(response.code).send(response);
    }
    catch (error) {
        return res.status(400).json({ msg: error.errors });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { code, msg, user } = yield (0, service_1.loginUserService)(req.body);
        if (code === 200 && user) {
            const token = yield (0, helper_1.createToken)(user._id);
            return res.status(code).send({ msg, name: user.name, token });
        }
        else if (code === 400) {
            return res.status(code).send({ msg });
        }
    }
    catch (error) {
        return next({ code: 500, msg: "Internal Server Error", error });
    }
});
exports.login = login;
const followUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { targetUserId } = req.params;
        if (!targetUserId || !mongoose_1.default.Types.ObjectId.isValid(targetUserId)) {
            return next({ code: 400, msg: 'Invalid targetUserId' });
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const followResult = yield (0, service_1.followUser)(userId, targetUserId);
        if (followResult.code === 200) {
            res.status(200).json({ message: 'Successfully Followed User' });
        }
        else {
            res.status(followResult.code).json({ message: followResult.message });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to follow user' });
    }
});
exports.followUserController = followUserController;
const unFollowUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { targetUserId } = req.params;
        if (!targetUserId || !mongoose_1.default.Types.ObjectId.isValid(targetUserId)) {
            return next({ code: 400, msg: 'Invalid targetUserId' });
        }
        const userId = req.user._id;
        ;
        const unFollowResult = yield (0, service_1.unFollowUser)(userId, targetUserId);
        if (unFollowResult.code === 200) {
            res.status(200).json({ message: 'Successfully Unfollowed User' });
        }
        else {
            res.status(unFollowResult.code).json({ message: unFollowResult.message });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to unfollow user' });
    }
});
exports.unFollowUserController = unFollowUserController;
