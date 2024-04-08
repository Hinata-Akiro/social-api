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
const supertest_1 = __importDefault(require("supertest"));
const testdb_1 = __importDefault(require("../testdb"));
const test_helper_1 = require("../helper/test-helper");
const helper_1 = require("../../utils/helper");
const enum_1 = require("../../users/enum");
const app_1 = __importDefault(require("../../app"));
const api = (0, supertest_1.default)(app_1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testdb_1.default.dbConnect();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, test_helper_1.deleteUsers)();
    yield (0, test_helper_1.deletePost)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testdb_1.default.dbDisconnect();
    testdb_1.default.dbCleanUp();
}));
describe("POST /api/v1/posts", () => {
    let userToken, userId;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, test_helper_1.createUser)({
            name: "Test User",
            email: "test@example.com",
            password: yield (0, helper_1.hashPassword)("password"),
            role: enum_1.UserRole.Admin,
        });
        userId = user._id;
        userToken = yield (0, helper_1.createToken)(user._id);
    }));
    it("should successfully create a new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const postData = {
            text: "this is a new post"
        };
        const response = yield api.post("/api/v1/posts")
            .set("Authorization", `Bearer ${userToken}`)
            .send(postData)
            .expect(201);
        expect(response.body).toMatchObject({
            code: 201,
            msg: "post created successfully",
            data: expect.any(Object),
        });
    }));
    it("should return a 400 error for validation failures", () => __awaiter(void 0, void 0, void 0, function* () {
        const postData = {};
        const response = yield api.post("/api/v1/posts")
            .set("Authorization", `Bearer ${userToken}`)
            .send(postData)
            .expect(400);
        expect(response.body.errors.length).toBeGreaterThan(0);
    }));
});
describe("GET /api/v1/posts/feed", () => {
    let userToken, userId;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, test_helper_1.createUser)({
            name: "Test User",
            email: "test@example.com",
            password: "password",
            role: enum_1.UserRole.Admin,
        });
        userId = user === null || user === void 0 ? void 0 : user._id;
        userToken = yield (0, helper_1.createToken)(user._id);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_helper_1.deleteUsers)();
    }));
    it("should successfully retrieve feed posts with default paging", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get("/api/v1/posts/feed/posts")
            .set("Authorization", `Bearer ${userToken}`)
            .expect(200);
        expect(response.body).toMatchObject({
            code: 200,
        });
    }));
    // it("should successfully retrieve feed posts with custom paging and sorting", async () => {
    //     const skip = 0;
    //     const limit = 10;
    //     const sort = 'desc';
    //     const response = await api.get(`/api/v1/posts/feed`).query({ skip, limit, sort})
    //                        .set("Authorization", `Bearer ${userToken}`)
    //                        .expect(200);
    //     expect(response.body).toMatchObject({
    //         code: 200,
    //     });
    // });
});
