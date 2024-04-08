import express, { Application, Express, Request, Response } from 'express';
import rateLimit from "express-rate-limit";
import router from './routes';
import { errorHandler, errorLogger, invalidUrl } from './middleware/error-middleware';
import helmet from 'helmet';
import { CustomRequest } from './utils/custome-response';
import session from 'express-session';
import config from './config/varibales';
import { client as redisClient, redisConnect } from './cache/redis';
import {cachingMiddleware} from './middleware/caching-middleware';
import { createServer } from 'http';
import { Server , Socket } from 'socket.io';
import { getUserNotifications } from './notification/service';
import Websocket from './socket-connection';

const app: Application  = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
}));

const server = createServer(app);
const io = Websocket.getInstance(server);


(async () => {
    await redisConnect(); 
    app.use(
        session({
            name: 'social',
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            },
        })
    );
})();

app.use(cachingMiddleware);

io.on('connection', (socket:Socket) => {
    console.log('User connected:');

    socket.on('user-notification', async ({userId}) => {
        await getUserNotifications(socket, userId);
      });

    socket.on('disconnect', () => {
    console.log('User disconnected:');
      });
})



declare global {
    namespace Express {
        interface Request extends CustomRequest { }
    }
}

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the social application!");
});

app.use('/api/v1', router);

app.use(invalidUrl);
app.use(errorLogger);
app.use(errorHandler);


export default server;
