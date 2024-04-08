import { faker } from "@faker-js/faker";
import { text } from "express";


const  createMockPost = {
    text: "This is some mock text for the post.",
    likes: [], 
    comments: [], 
}


const createMockComment = {
    text: faker.finance.accountName
}

const createMockUser = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "password",
}

export { createMockUser,  createMockPost, createMockComment }