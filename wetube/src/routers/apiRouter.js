import express from "express";
import { createComment, registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id/view", registerView)
apiRouter.post("/videos/:id/comment", createComment)

export default apiRouter;