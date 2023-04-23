import mongoose from "mongoose";
import Video from "../models/video"

export const home = (req, res) => {
    Video.find({})
    .then((videos) => {
        return res.render("home.pug", { pageTitle: "Home", videos});
    }).catch((err) => {
        console.log(err);
    })
}
export const see = (req, res) => {
    const { id } = req.params;
    return res.render("watch.pug", { pageTitle: `Watch`});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit.pug", { pageTitle: "Edit"});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body.title;
    return res.redirect(`/videos/${id}`);
}
export const deleteVideo = (req, res) => {
    return res.send("Delete video");
}

export const search = (req, res) => res.send("Search video");
export const getUpload = (req, res) => {
    return res.render("upload.pug", {pageTitle: "Upload video"});
}
export const postUpload = (req, res) => {
    Video.create({
        title: req.body.title,
        description: req.body.description,
        createdAt: new Date(),
        hashtags: req.body.hashtag.split(","),
        meta: {
            views: 0,
            reating: 0,
        },
    })
    .then((videos) => {
        return res.render("home.pug", { pageTitle: "Home", videos});
    }).catch((err) => {
        console.log(err);
    })
    return res.redirect("/");
}