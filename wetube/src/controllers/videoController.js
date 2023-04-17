const tempUser = {
    username: "Baskin",
    loggedIn: true,
};

export const trending = (req, res) => {
    const videos = [1, 2, 3, 4, 5];
    return res.render("home.pug", { pageTitle: "Home", tempUser: tempUser, videos});
}
export const see = (req, res) => res.render("watch.pug", { pageTitle: "Watch", });
export const edit = (req, res) => res.render("edit.pug", { pageTitle: "Edit", });

export const deleteVideo = (req, res) => {
    res.send("Delete video");
}

export const search = (req, res) => res.send("Search video");
export const upload = (req, res) => res.send("Upload video");