import { check } from "express-validator";

const validateUser = [
    check('name')
        .notEmpty()
        .isString()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .isString()
        .withMessage('Invalid email'),
    check('password')
        .isLength({ min: 5 })
        .isString()
        .withMessage('Password must be at least 5 characters'),
];


const validateLoginUser = [
    check("email")
         .notEmpty()
        .isString()
         .withMessage('Email is required'),
    check("password")
          .notEmpty()
          .isString()
          .withMessage('Password is required'),
]

const validatePost = [
    check('text')
        .notEmpty()
        .withMessage('Text is required')
        .isString()
        .withMessage('Text must be a string'),
    check('imageUrl')
        .optional({ nullable: true })
        .isString()
        .withMessage('Image URL must be a string'),
    check('likes')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Likes must be an array of user IDs'),
    check('comments')
        .optional({ nullable: true })
        .isArray()
        .withMessage('Comments must be an array of comment IDs')
];

const validateComment = [
    check('text')
        .notEmpty()
        .withMessage('Text is required')
        .isString()
        .withMessage('Text must be a string')
];


export { validateUser,validateLoginUser,validatePost,validateComment};