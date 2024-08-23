import express from "express";
import { getJoin, getLogin, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicPageMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicPageMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicPageMiddleware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;