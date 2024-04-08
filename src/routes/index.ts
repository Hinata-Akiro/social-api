import { Router } from "express";
import userRouter from "./users-routes";
import postRouter from "./post-routes";
import likeRouter from "./likes-routes";
import commentRouter from "./comments-routes";

const router = Router();

router.use("/users", userRouter);

router.use("/posts", postRouter);

router.use("/likes", likeRouter);

router.use("/comments", commentRouter);




export default router;


