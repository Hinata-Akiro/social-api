"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateComment = exports.validatePost = exports.validateLoginUser = exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
const validateUser = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .isString()
        .withMessage('Name is required'),
    (0, express_validator_1.check)('email')
        .isEmail()
        .isString()
        .withMessage('Invalid email'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 5 })
        .isString()
        .withMessage('Password must be at least 5 characters'),
];
exports.validateUser = validateUser;
const validateLoginUser = [
    (0, express_validator_1.check)("email")
        .notEmpty()
        .isString()
        .withMessage('Email is required'),
    (0, express_validator_1.check)("password")
        .notEmpty()
        .isString()
        .withMessage('Password is required'),
];
exports.validateLoginUser = validateLoginUser;
const validatePost = [
    (0, express_validator_1.check)('text')
        .notEmpty()
        .withMessage('Text is required')
        .isString()
        .withMessage('Text must be a string'),
    (0, express_validator_1.check)('imageUrl')
        .optional({ nullable: true })
        .isString()
        .withMessage('Image URL must be a string'),
    (0, express_validator_1.check)('likes')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Likes must be an array of user IDs'),
    (0, express_validator_1.check)('comments')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Comments must be an array of comment IDs')
];
exports.validatePost = validatePost;
const validateComment = [
    (0, express_validator_1.check)('text')
        .notEmpty()
        .withMessage('Text is required')
        .isString()
        .withMessage('Text must be a string')
];
exports.validateComment = validateComment;
