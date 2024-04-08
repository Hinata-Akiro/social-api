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
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middleware/error-middleware");
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const varibales_1 = __importDefault(require("./config/varibales"));
const redis_1 = require("./cache/redis");
const caching_middleware_1 = require("./middleware/caching-middleware");
const http_1 = require("http");
const service_1 = require("./notification/service");
const socket_connection_1 = __importDefault(require("./socket-connection"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
}));
const server = (0, http_1.createServer)(app);
const io = socket_connection_1.default.getInstance(server);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, redis_1.redisConnect)();
    app.use((0, express_session_1.default)({
        name: 'social',
        secret: varibales_1.default.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
}))();
app.use(caching_middleware_1.cachingMiddleware);
io.on('connection', (socket) => {
    console.log('User connected:');
    socket.on('user-notification', (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId }) {
        yield (0, service_1.getUserNotifications)(socket, userId);
    }));
    socket.on('disconnect', () => {
        console.log('User disconnected:');
    });
});
app.get("/", (req, res) => {
    res.send("Welcome to the social application!");
});
app.use('/api/v1', routes_1.default);
app.use(error_middleware_1.invalidUrl);
app.use(error_middleware_1.errorLogger);
app.use(error_middleware_1.errorHandler);
exports.default = server;
