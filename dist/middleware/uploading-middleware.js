"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const varibales_1 = __importDefault(require("../config/varibales"));
cloudinary_1.v2.config({
    cloud_name: varibales_1.default.CLOUDINARY_CLOUD_NAME,
    api_key: varibales_1.default.CLOUDINARY_API_KEY,
    api_secret: varibales_1.default.CLOUDINARY_API_SECRET,
});
