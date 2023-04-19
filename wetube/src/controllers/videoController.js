const tempUser = {
    username: "Baskin",
    loggedIn: true,
};

export const trending = (req, res) => {
    const videos = [
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
            id: 1,
        },
        {
            title: "I'm back!",
            rating: 5,
            comments: 1,
            createdAt: "2 minutes ago",
            views: 291,
            id: 1,
        },
    ];
    return res.render("home.pug", { pageTitle: "Home", tempUser: tempUser, videos});
}
export const see = (req, res) => res.render("watch.pug", { pageTitle: "Watch", });
export const edit = (req, res) => res.render("edit.pug", { pageTitle: "Edit", });

export const deleteVideo = (req, res) => {
    res.send("Delete video");
}

export const search = (req, res) => res.send("Search video");
export const upload = (req, res) => res.send("Upload video");