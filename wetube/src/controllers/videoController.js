import mongoose from "mongoose";
import Video from "../models/video"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({createdAt:"desc"});
        return res.render("home", {pageTitle: "Home", videos});
    } catch(err) {
        return res.render("server-error");
    }
}
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    return res.render("watch.pug", { pageTitle: video.title, video});
}
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    return res.render("edit.pug", { pageTitle: `Edit ${video.title}`, video});
}
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const isVideoExist = await Video.exists({_id:id});
    if(!isVideoExist){
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    })
    return res.redirect(`/videos/${id}`);
}
export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async (req, res) => {
    const {keyword} = req.query;
    let videos = []
    if(keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            }
        });
    }
    return res.render("search", {pageTitle: "Search", videos});
}
export const getUpload = (req, res) => {
    return res.render("upload.pug", {pageTitle: "Upload"});
}
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags: Video.formatHashtags(hashtags),
        });
    } catch(err) {
        return res.status(400).render("upload.pug", {
            pageTitle: "Upload", 
            errorMessage:err._message
        });
    }
    return res.redirect("/");
}