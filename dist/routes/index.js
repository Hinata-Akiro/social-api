"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = __importDefault(require("./users-routes"));
const post_routes_1 = __importDefault(require("./post-routes"));
const likes_routes_1 = __importDefault(require("./likes-routes"));
const comments_routes_1 = __importDefault(require("./comments-routes"));
const router = (0, express_1.Router)();
router.use("/users", users_routes_1.default);
router.use("/posts", post_routes_1.default);
router.use("/likes", likes_routes_1.default);
router.use("/comments", comments_routes_1.default);
exports.default = router;
