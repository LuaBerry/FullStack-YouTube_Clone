export const trending = (req, res) => res.send("Homepage showing trending videos");

export const see = (req, res) => {
    console.log(req.params);
    res.send(`Watch video ${req.params.id}`);
}

export const edit = (req, res) => {
    console.log(req.params);
    res.send("Edit video");
}

export const deleteVideo = (req, res) => {
    console.log(req.params);
    res.send("Delete video");
}

export const search = (req, res) => res.send("Search video");
export const upload = (req, res) => res.send("Upload video");