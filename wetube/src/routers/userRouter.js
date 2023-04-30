import express from "express";
import { finishGithubLogin, getEdit, logout, remove, startGithubLogin, watch} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", getEdit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", watch);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);

export default userRouter;