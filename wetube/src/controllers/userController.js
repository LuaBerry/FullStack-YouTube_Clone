export const getJoin = (req, res) => {

    return res.render("join.pug", {pageTitle: "Join"});
}

export const postJoin = (req, res) => {
    const { email, name, username, password, location} = req.body;
    
    return res.redirect("/");
}

export const getEdit = (req, res) => {

    return res.render("", );
}

export const postEdit = (req, res) => {

    return res.render("", );
}

export const remove = (req, res) => {

    return res.render("", );
}
export const login = (req, res) => {

    return res.render("", );
}
export const logout = (req, res) => {

    return res.render("", );
}
export const watch = (req, res) => {
    console.log(req.params);
    res.send("See user");
}