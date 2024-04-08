import supertest from "supertest";
import testdb from "../testdb";
import { createUser, deleteUsers, createPost, deletePost } from "../helper/test-helper";
import { createMockPost } from "../mock-data/mock-data";
import { createToken, hashPassword } from "../../utils/helper";
import { IUser } from "../../users/interface";
import { UserRole } from "../../users/enum";
import server from "../../app";

const api = supertest(server);

beforeAll(async () => {
    await testdb.dbConnect();
});

afterEach(async () => {
    await deleteUsers();
    await deletePost();
});

afterAll(async () => {
    await testdb.dbDisconnect();
    testdb.dbCleanUp();
});

describe("POST /api/v1/posts", () => {
    let userToken: string, userId;

    beforeEach(async () => {
        const user = await createUser({
            name: "Test User",
            email: "test@example.com",
            password: await hashPassword("password"),
            role: UserRole.Admin,
        });
        userId = user._id;
        userToken = await createToken(user._id);
    });

    it("should successfully create a new post", async () => {
        const postData = {
            text: "this is a new post"
        };
        const response = await api.post("/api/v1/posts")
            .set("Authorization", `Bearer ${userToken}`)
            .send(postData)
            .expect(201);

        expect(response.body).toMatchObject({
            code: 201,
            msg: "post created successfully",
            data: expect.any(Object),
        });
    });

    it("should return a 400 error for validation failures", async () => {
        const postData = {}; 
        const response = await api.post("/api/v1/posts")
            .set("Authorization", `Bearer ${userToken}`)
            .send(postData)
            .expect(400);
    
            expect(response.body.errors.length).toBeGreaterThan(0);
    });
    
});


describe("GET /api/v1/posts/feed", () => {
    let userToken: string, userId;

    beforeAll(async () => {
        const user = await createUser({
            name: "Test User",
            email: "test@example.com",
            password: "password",
            role: UserRole.Admin,
        });
        userId = user?._id;
        userToken = await createToken(user._id); 
    });

    afterAll(async () => {
        await deleteUsers();
    });

    it("should successfully retrieve feed posts with default paging", async () => {

        const response = await api.get("/api/v1/posts/feed/posts")
            .set("Authorization", `Bearer ${userToken}`)
            .expect(200);

        expect(response.body).toMatchObject({
            code: 200,
        });
    });

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
