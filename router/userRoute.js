import express from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { getAllUser, getUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/", authenticate, getAllUser);
userRouter.get("/profile/me", authenticate, restrict(["user"]), getUserProfile);

export default userRouter;
