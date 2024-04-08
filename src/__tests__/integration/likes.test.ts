import supertest from "supertest";
import testdb from "../testdb";
import { createUser, deleteUsers, createPost, deletePost,createComment,deleteComment , createLikes,deleteLikes } from "../helper/test-helper";
import { createMockPost } from "../mock-data/mock-data";
import { createToken, hashPassword } from "../../utils/helper";
import { IUser } from "../../users/interface";
import { UserRole } from "../../users/enum";
import { IPost } from "../../posts/interface";
import { ILike } from "../../likes/interface";
import server from "../../app";

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

describe('POST /api/v1/posts/:postId/like', () => {
    let userToken : string, userId, postId : string;

    beforeEach(async () => {
        const user = await createUser({
            name: "Test User",
            email: "test@example.com",
            password: await hashPassword("password"),
            role: UserRole.User,
        });
        userId = user._id;
        userToken = await createToken(user._id); 

        const post = await createPost({
            ...createMockPost,
            author: userId
        });
        postId = post._id;
    });

    it('should successfully like a post', async () => {
        const response = await api.post(`/api/v1/likes/posts/${postId}/like`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200);

        expect(response.body).toMatchObject({
            message: 'Post liked successfully',
        });
    });
})

describe('POST /api/v1/posts/:postId/unlike', () => {
    let userToken: any, userId, postId: string;

    beforeEach(async () => {
        const user = await createUser({
            name: "Test User",
            email: "test@example.com",
            password: await hashPassword("password"),
            role: UserRole.User,
        });
        userId = user._id;
        userToken = await createToken(user._id); 

        const post = await createPost({
            ...createMockPost,
            author: userId
        });
        postId = post._id;
    });

    it('should successfully unlike a post', async () => {
        const response = await api.post(`/api/v1/likes/posts/${postId}/unlike`)
            .set('Authorization', `Bearer ${userToken}`)
            .expect(200);

        expect(response.body).toMatchObject({
            message: 'Post unliked successfully',
        });
    });
})