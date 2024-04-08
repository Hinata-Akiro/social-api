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
const app_1 = __importDefault(require("../../app"));
const testdb_1 = __importDefault(require("../testdb"));
const test_helper_1 = require("../helper/test-helper");
const mock_data_1 = require("../mock-data/mock-data");
const helper_1 = require("../../utils/helper");
const enum_1 = require("../../users/enum");
const api = (0, supertest_1.default)(app_1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testdb_1.default.dbConnect();
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, test_helper_1.deleteUsers)();
    yield (0, test_helper_1.deletePost)();
    yield (0, test_helper_1.deleteComment)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield testdb_1.default.dbDisconnect();
    testdb_1.default.dbCleanUp();
}));
describe("POST /api/v1/comments/:postId", () => {
    let user, post, userToken;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        user = yield (0, test_helper_1.createUser)({
            name: "John Doe",
            email: "john@example.com",
            password: yield (0, helper_1.hashPassword)("password123"),
            role: enum_1.UserRole.User,
        });
        const mockPost = mock_data_1.createMockPost;
        post = yield (0, test_helper_1.createPost)(Object.assign(Object.assign({}, mockPost), { author: user._id }));
        userToken = yield (0, helper_1.createToken)(user._id);
    }));
    it("should successfully create a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post(`/api/v1/comments/${post._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({ text: "This is a test comment" })
            .expect(200);
        expect(response.body).toMatchObject({
            message: expect.any(String),
        });
    }));
});
