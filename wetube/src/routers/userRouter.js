import express from "express";
import { getEdit, logout, remove, watch} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", getEdit);
userRouter.get("/remove", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", watch);

export default userRouter;