"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
const path = require('path');
const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.mp4' &&
        ext !== '.mkv' &&
        ext !== '.jpeg' &&
        ext !== '.jpg' &&
        ext !== '.png') {
        cb(new Error('File type is not supported'), false);
        return;
    }
    cb(null, true);
};
exports.default = multer({
    storage: multer.diskStorage({}),
    fileFilter,
});
