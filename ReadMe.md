# Social Media API

Welcome to Social Media API.

## Functionality

### User Management

- Users can register and create accounts.
- Users can log in and authenticate themselves (consider options like JWT or session-based authentication).

### Posts and Feed

- Users can create posts with text and optional image/video attachments.
- Users can follow other users.
- Users can see posts from the people they follow in their personalized feed.
- Implement pagination for retrieving large amounts of data efficiently.

### Likes and Comments

- Users can like and comment on posts created by others.
- Users can see the number of likes and comments on a post.

### Notifications

- Users can receive notifications for mentions, likes, and comments (bonus points for implementing real-time notifications using websockets or push notifications).

## Instructions

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `npm install` of `yarn`.
3. Set up a MongoDB database to store user information, posts, likes, comments, and notifications.
4. set up Redis connection 
5. use `yarn dev` to start the server on dev and `yarn start` to start the server on production
6. use `yarn build` to build  the project

## Technologies Used

- [Node.js](https://nodejs.org/): A JavaScript runtime environment for server-side development.
- [Express.js](https://expressjs.com/): A fast, unopinionated, minimalist web framework for Node.js.
- [MongoDB](https://www.mongodb.com/): A NoSQL database program, using JSON-like documents with optional schemas.
- [Postman](https://www.postman.com/): A collaboration platform for API development, used for API testing and documentation.
- Mongoose
- JWT (JSON Web Tokens)
- Socket.io (for real-time notifications)

## API Endpoints

- `POST api/v1/register`: Register a new user.
- `POST api/v1/login`: Log in and authenticate a user.
- `POST api/v1/posts`: Create a new post.
- `GET api/v1/posts/feed/posts`: Get posts from the user's personalized feed.
- `POST api/v1/likes/posts/:postId/like`: Like a post.
- `POST api/v1/likes/posts/:postId/unlike`: Like a post.
- `POST api/v1/comments/posts/:postId/comment`: Comment on a post.
- `GET api/v1/notifications`: Get notifications for the authenticated user.

## Documentation

The API documentation for the Social API project can be found [here](https://documenter.getpostman.com/view/28059866/2sA35MxdyS).

## Live Link

You can access the live version of the Social API project [here](https://mock-premier-league-d7cs.onrender.com).
