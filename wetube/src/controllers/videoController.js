import Comment from "../models/Comment";
import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({createdAt:"desc"});
        return res.render("home", {pageTitle: "Home", videos});
    } catch(err) {
        return res.render("video/server-error");
    }
}
export const watch = async (req, res) => {
    const { id } = req.params;
    // const video = await Video.findById(id).populate("owner").populate("comments");
    const video = await Video.findById(id).populate("owner").populate({
        path:"comments",
        populate: [
            {path: "owner"}
        ]
    });
    if(!video){
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    return res.render("video/watch.pug", { pageTitle: video.title, video});
}
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    if(video.owner != req.session.user._id) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    return res.render("video/edit.pug", { pageTitle: `Edit ${video.title}`, video});
}
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    if(video.owner != req.session.user._id) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
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
    const video = await Video.findById(id);
    const user = await User.findById(req.session.user._id);
    
    if(!video) {
        return res.status(404).render("404", {pageTitle:"Video not found"});
    }
    console.log(video.owner);
    console.log(user._id);
    if(!video.owner.equals(user._id)) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    user.videos.splice(user.videos.indexOf(id), 1);
    user.save();
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
    return res.render("video/search", {pageTitle: "Search", videos});
}
export const getUpload = (req, res) => {
    return res.render("video/upload.pug", {pageTitle: "Upload"});
}
export const postUpload = async (req, res) => {
    const file = req.file;
    const {title, description, hashtags} = req.body;
    const { _id } = req.session.user;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: file.path,
            hashtags: Video.formatHashtags(hashtags),
            owner: _id,
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
    } catch(err) {
        console.log(err);
        return res.status(400).render("video/upload.pug", {
            pageTitle: "Upload", 
            errorMessage:err._message
        });
    }
    return res.redirect("/");
}

export const registerView = async (req, res) => {
    const { id } = req. params;
    const video = await Video.findById(id);
    if(!video){
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}

export const createComment = async (req, res) => {
    const video = await Video.findById(req.params.id);
    if(!video){
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text: req.body.text,
        video,
        owner: req.session.user,
    })
    video.comments.push(comment);
    video.save();
    return res.json(201, {username:req.session.user.username});
}