import express from "express";
import { trending } from "../controllers/videoController";
import { handleJoin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", handleJoin);

export default globalRouter;