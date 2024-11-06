import express from "express";
import { signupUser, login } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);

userRouter.post("/login", login);

export default userRouter;
