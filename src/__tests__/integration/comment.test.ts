import supertest from "supertest";
import server from "../../app";
import testdb from "../testdb";
import { createUser, deleteUsers, createPost, deletePost,createComment,deleteComment } from "../helper/test-helper";
import { createMockPost } from "../mock-data/mock-data";
import { createToken, hashPassword } from "../../utils/helper";
import { IUser } from "../../users/interface";
import { UserRole } from "../../users/enum";
import { IPost } from "../../posts/interface";

const api = supertest(server);


beforeAll(async () => {
    await testdb.dbConnect();
});

afterEach(async () => {
    await deleteUsers();
    await deletePost();
    await deleteComment();
});

afterAll(async () => {
    await testdb.dbDisconnect();
    testdb.dbCleanUp();
});

describe("POST /api/v1/comments/:postId", () => {
    let user, post:IPost, userToken: string;

    beforeEach(async () => {
        user = await createUser({
            name: "John Doe",
            email: "john@example.com",
            password: await hashPassword("password123"),
            role: UserRole.User,
        });

        const mockPost = createMockPost;
        post = await createPost({...mockPost, author: user._id});

        userToken = await createToken(user._id);
    });

    it("should successfully create a comment", async () => {
        const response = await api.post(`/api/v1/comments/${post._id}`)
            .set("Authorization", `Bearer ${userToken}`)
            .send({ text: "This is a test comment" })
            .expect(200);

        expect(response.body).toMatchObject({
            message: expect.any(String),
        });
    });
});