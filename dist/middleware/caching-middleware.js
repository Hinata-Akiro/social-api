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
exports.setToCache = exports.cachingMiddleware = void 0;
const redis_1 = require("../cache/redis");
const getFromCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield redis_1.client.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    }
    catch (err) {
        console.error("Error fetching from cache:", err);
        return null;
    }
});
// Function to store data in Redis
const setToCache = (key_1, payload_1, ...args_1) => __awaiter(void 0, [key_1, payload_1, ...args_1], void 0, function* (key, payload, ttl = 60 * 60) {
    try {
        yield redis_1.client.set(key, JSON.stringify(payload), { EX: ttl });
    }
    catch (err) {
        console.error("Error storing in cache:", err);
    }
});
exports.setToCache = setToCache;
// Caching middleware
const cachingMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = req.originalUrl;
    const cachedData = yield getFromCache(cacheKey);
    if (cachedData) {
        console.log("Data retrieved from cache:", cacheKey);
        res.send({ msg: "data retrieved successfully", data: cachedData });
    }
    else {
        next();
    }
});
exports.cachingMiddleware = cachingMiddleware;
