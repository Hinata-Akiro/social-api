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
const mock_data_1 = require("../mock-data/mock-data");
const helper_1 = require("../../utils/helper");
const enum_1 = require("../../users/enum");
const app_1 = __importDefault(require("../../app"));
const api = (0, supertest_1.default)(app_1.default);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    testdb_1.default.dbConnect();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    testdb_1.default.dbDisconnect();
    testdb_1.default.dbCleanUp();
}));
describe("POST /api/v1/users/register", () => {
    it("Should register a user when the body is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mock_data_1.createMockUser;
        const url = "/api/v1/users/register";
        const { body } = yield api
            .post(url)
            .send(payload)
            .expect(201);
        expect(body).toMatchObject({
            code: 201,
            msg: "You have successfully signed up",
            data: {
                _id: expect.any(String),
                name: payload.name,
                email: payload.email,
                password: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                __v: expect.any(Number),
            },
        });
    }));
    it('should return an error message with status code 400 when a user with the same email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mock_data_1.createMockUser;
        const url = "/api/v1/users/register";
        const { body } = yield api
            .post(url)
            .send(payload)
            .expect(400);
        expect(body).toMatchObject({
            code: 400,
            msg: `User with email ${payload.email} already exisit`,
        });
    }));
});
describe("POST /api/v1/users/login", () => {
    let userValue;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        userValue = yield (0, test_helper_1.createUser)({
            name: "victor barny",
            email: "victor@gmail.com",
            password: yield (0, helper_1.hashPassword)("password"),
            role: enum_1.UserRole.Admin,
        });
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_helper_1.deleteUsers)();
    }));
    it("Should login a user when the body is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            email: userValue.email,
            password: "password",
        };
        const url = "/api/v1/users/login";
        const { body } = yield api.post(url).send(payload).expect(200);
        expect(body).toMatchObject({
            msg: "You have successfully logged in",
            token: expect.any(String),
            name: expect.any(String),
        });
    }));
    it('should return an error message with status code 400 when the email or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            email: userValue.email,
            password: "<PASSWORD>",
        };
        const url = "/api/v1/users/login";
        const { body } = yield api.post(url).send(payload).expect(400);
        expect(body).toMatchObject({
            msg: expect.any(String),
        });
    }));
    it('should return an error message with status code 400 when the email or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            email: "victord@gmail.com",
            password: "password",
        };
        const url = "/api/v1/users/login";
        const { body } = yield api.post(url).send(payload).expect(400);
        expect(body).toMatchObject({
            msg: expect.any(String),
        });
    }));
    it('should return an error message with status code 400 when the email or password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            email: "victord@gmail.com",
            password: "<PASSWORD>",
        };
        const url = "/api/v1/users/login";
        const { body } = yield api.post(url).send(payload).expect(400);
        expect(body).toMatchObject({
            msg: expect.any(String),
        });
    }));
});
describe('POST /api/v1/users/:targetUserId/follow', () => {
    let user, targetUser, userToken;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        user = yield (0, test_helper_1.createUser)({
            name: "Test User",
            email: "testuser@example.com",
            password: yield (0, helper_1.hashPassword)("password"),
            role: enum_1.UserRole.User,
        });
        targetUser = yield (0, test_helper_1.createUser)({
            name: "Target User",
            email: "targetuser@example.com",
            password: yield (0, helper_1.hashPassword)("password"),
            role: enum_1.UserRole.User,
        });
        userToken = yield (0, helper_1.createToken)(user === null || user === void 0 ? void 0 : user._id);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, test_helper_1.deleteUsers)();
    }));
    it('should successfully follow a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = `/api/v1/users/follow/${targetUser._id}`;
        const { body } = yield api
            .post(url)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200);
        expect(body).toMatchObject({
            message: 'Successfully Followed User',
        });
    }));
    it('should return an error if the targetUserId is invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const url = `/api/v1/users/follow/invalidUserId`;
        const { body } = yield api
            .post(url)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(400);
        expect(body).toMatchObject({
            error: {
                code: 400,
                msg: 'Invalid targetUserId',
            },
        });
    }));
    it('should return an error if the target user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const nonExistentUserId = '507f1f77bcf86cd799439011';
        const url = `/api/v1/users/follow/${nonExistentUserId}`;
        const { body } = yield api
            .post(url)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(404);
        expect(body).toMatchObject({
            message: expect.any(String),
        });
    }));
});
