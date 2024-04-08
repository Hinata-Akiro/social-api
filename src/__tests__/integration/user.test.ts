import supertest from "supertest";
import testdb from "../testdb";
import { createUser,deleteUsers } from "../helper/test-helper";
import { createMockUser } from "../mock-data/mock-data";
import { createToken, hashPassword } from "../../utils/helper";
import { UserRole } from "../../users/enum";
import { IUser } from "../../users/interface";
import server from "../../app";

const api = supertest(server);

beforeAll(async () => {
    testdb.dbConnect();
  });
  
  afterAll(async () => {
    testdb.dbDisconnect();
    testdb.dbCleanUp();
  });

 describe("POST /api/v1/users/register", () => {
    it("Should register a user when the body is correct", async () => {
        const payload = createMockUser
        const url = "/api/v1/users/register";

      const { body } = await api
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
    })

    it('should return an error message with status code 400 when a user with the same email already exists', async () => {
        const payload = createMockUser
        const url = "/api/v1/users/register";

     const {body} = await api
     .post(url)
     .send(payload)
     .expect(400);

     expect(body).toMatchObject({
         code: 400,
         msg: `User with email ${payload.email} already exisit`,
     })
    })
 });


 describe("POST /api/v1/users/login", () => {
    let userValue: IUser;
  beforeEach(async () => {
    userValue = await createUser({
      name: "victor barny",
      email: "victor@gmail.com",
      password: await hashPassword("password"),
      role: UserRole.Admin,
    });
  });

  afterEach(async () => {
    await deleteUsers();
  });

  it("Should login a user when the body is correct", async () => {
    const payload = {
      email: userValue.email,
      password: "password",
    };
    const url = "/api/v1/users/login";
    const { body } = await api.post(url).send(payload).expect(200)

    expect(body).toMatchObject({
      msg: "You have successfully logged in",
      token: expect.any(String),
      name: expect.any(String),
    });
   });

   it('should return an error message with status code 400 when the email or password is incorrect', async () => {
    const payload = {
      email: userValue.email,
      password: "<PASSWORD>",
    };
    const url = "/api/v1/users/login";
    const { body } = await api.post(url).send(payload).expect(400)

    expect(body).toMatchObject({
      msg: expect.any(String),
    });
   });

   it('should return an error message with status code 400 when the email or password is incorrect', async () => {
    const payload = {
      email:  "victord@gmail.com",
      password: "password",
    };
    const url = "/api/v1/users/login";
    const { body } = await api.post(url).send(payload).expect(400)
    expect(body).toMatchObject({
      msg: expect.any(String),
    });
    })

    it('should return an error message with status code 400 when the email or password is incorrect', async () => {
    const payload = {
      email:  "victord@gmail.com",
      password: "<PASSWORD>",
    };
    const url = "/api/v1/users/login";
    const { body } = await api.post(url).send(payload).expect(400)
    expect(body).toMatchObject({
      msg: expect.any(String),
    });
    })
 });

 describe('POST /api/v1/users/:targetUserId/follow', () => {
  let user:IUser, targetUser:IUser, userToken:string;

  beforeEach(async () => {
      user = await createUser({
          name: "Test User",
          email: "testuser@example.com",
          password: await hashPassword("password"),
          role: UserRole.User,
      });

      targetUser = await createUser({
          name: "Target User",
          email: "targetuser@example.com",
          password: await hashPassword("password"),
          role: UserRole.User,
      });

      userToken = await createToken(user?._id as string)
  });

  afterEach(async () => {
      await deleteUsers(); 
  });

  it('should successfully follow a user', async () => {
      const url = `/api/v1/users/follow/${targetUser._id}`;

      const { body } = await api
          .post(url)
          .set('Authorization', `Bearer ${userToken}`) 
          .expect(200);

      expect(body).toMatchObject({
          message: 'Successfully Followed User',
      });
  });

  it('should return an error if the targetUserId is invalid', async () => {
      const url = `/api/v1/users/follow/invalidUserId`;

      const { body } = await api
          .post(url)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(400);

      expect(body).toMatchObject({
        error: {
          code: 400,
          msg: 'Invalid targetUserId',
        },
      });
  });

  it('should return an error if the target user does not exist', async () => {
      const nonExistentUserId = '507f1f77bcf86cd799439011'; 
      const url = `/api/v1/users/follow/${nonExistentUserId}`;

      const { body } = await api
          .post(url)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(404);

      expect(body).toMatchObject({
          message: expect.any(String),
      });
  });
});

