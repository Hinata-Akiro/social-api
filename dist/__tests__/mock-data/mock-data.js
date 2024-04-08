"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockComment = exports.createMockPost = exports.createMockUser = void 0;
const faker_1 = require("@faker-js/faker");
const createMockPost = {
    text: "This is some mock text for the post.",
    likes: [],
    comments: [],
};
exports.createMockPost = createMockPost;
const createMockComment = {
    text: faker_1.faker.finance.accountName
};
exports.createMockComment = createMockComment;
const createMockUser = {
    name: faker_1.faker.person.fullName(),
    email: faker_1.faker.internet.email(),
    password: "password",
};
exports.createMockUser = createMockUser;
