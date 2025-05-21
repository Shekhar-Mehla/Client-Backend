import express from "express";
import { regitserNewUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", regitserNewUser);
export default userRouter;
