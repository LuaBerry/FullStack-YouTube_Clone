import express from "express";
import { finishGithubLogin, getEdit, logout, postEdit, remove, startGithubLogin, watch} from "../controllers/userController";
import { privatePageMiddleware, publicPageMiddleware } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/edit").all(privatePageMiddleware).get(getEdit).post(postEdit);
userRouter.get("/logout", privatePageMiddleware, logout);
userRouter.get("/:id(\\d+)", watch);
userRouter.get("/github/start", publicPageMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicPageMiddleware, finishGithubLogin);

export default userRouter;