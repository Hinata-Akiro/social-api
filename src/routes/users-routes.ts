import { register,login, unFollowUserController, followUserController } from "../users/controller";
import { Router } from "express";
import { validateLoginUser, validateUser } from "../utils/validator";
import { authGuard } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/register",validateUser, register);
userRouter.post("/login",validateLoginUser,login);
userRouter.post('/follow/:targetUserId',authGuard, followUserController);
userRouter.post('/unfollow/:targetUserId', authGuard,unFollowUserController);


export default userRouter;