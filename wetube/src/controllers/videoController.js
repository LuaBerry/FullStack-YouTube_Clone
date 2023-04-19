const tempUser = {
    username: "Baskin",
    loggedIn: true,
};
let videos = [
    {
        title: "First video",
        rating: 4,
        comments: 10,
        createdAt: "3 months ago",
        views: 8291,
        id: 1,
    },
    {
        title: "What I'm planning",
        rating: 4,
        comments: 32,
        createdAt: "2 weeks ago",
        views: 91820,
        id: 2,
    },
    {
        title: "I'm back!",
        rating: 5,
        comments: 1,
        createdAt: "2 minutes ago",
        views: 291,
        id: 3,
    },
];

export const trending = (req, res) => {
    return res.render("home.pug", { pageTitle: "Home", tempUser: tempUser, videos});
}
export const see = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("watch.pug", { pageTitle: `Watch`, video});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit.pug", { pageTitle: "Edit", video});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body.title;
    videos[id - 1].title = title;
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
    const video = {
        title: req.body.title,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(video);
    return res.redirect("/");
}