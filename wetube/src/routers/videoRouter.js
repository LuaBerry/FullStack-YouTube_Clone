import express from "express";
import { watch, getEdit, getUpload, deleteVideo, postEdit, postUpload } from "../controllers/videoController";
import { privatePageMiddleware, videoUploadMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").all(privatePageMiddleware).get(getUpload)
    .post(videoUploadMiddleware.single("video"), postUpload);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(privatePageMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(privatePageMiddleware).get(deleteVideo);


export default videoRouter;