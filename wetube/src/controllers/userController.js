import User from "../models/user";
import fetch from "node-fetch";
import bcrypt, { hash } from "bcrypt";

export const getJoin = (req, res) => {

    return res.render("join.pug", {pageTitle: "Join"});
}

export const postJoin = async (req, res) => {
    const { email, name, username, password, location} = req.body;
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if(exists) {
        return res.status(400).render("join", {
            pageTitle: "Join", 
            errorMessage: "This Username or Email is already taken."});
    }

    if(password !== password){
        return res.status(400).render("join", {
            pageTitle: "Join", 
            errorMessage: "Password confirmation does not match."});
    }
    try {
        await User.create({
            email,
            name,
            username,
            password,
            location,
        });
    }
    catch (err) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: err,
        })
    }

    return res.redirect("/login");
}

export const getEdit = (req, res) => {

    return res.render("edit-profile.pug", {pageTitle: "Edit Profile", });
}

export const postEdit = async (req, res) => {
    const _id = req.session.user._id;
    const { name, username, email, location } = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, {
        name,
        email,
        username,
        location,
    }, { 
        new: true
    });
    req.session.user = updatedUser;
    return res.redirect("/users/edit");
}

export const remove = (req, res) => {

    return res.render("", );
}
export const getLogin = (req, res) => {

    return res.render("login", {pageTitle: "Login"});
}

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    if(!user) {
        return res.status(400).render("login", {
            pageTitle: "Login", 
            errorMessage: "User doesn't exist."})
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if(!passwordCheck){
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "Password incorrect.",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;

    return res.redirect("/");
}
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
}

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    return res.redirect(`${baseUrl}?${params}`);
}

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();

    const tokenRequest = await( 
        await fetch(`${baseUrl}?${params}`, {
        method:"post",
        headers: {
            Accept: "application/json",
        },
    })).json();
    
    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";

        const userData = await (await fetch(apiUrl + "/user", {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();

        const emailData = await (await fetch(apiUrl + "/user/emails", {
            headers: {
                Authorization: `token ${access_token}`,
            }
        })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj) {
            return res.redirect("/login");
        }
        const user = await User.findOne({ email: emailObj.email});
        if(user) {
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
            return res.render("join", {
                pageTitle: "Join", 
                email: emailObj.email, 
                name: userData.login,
                username: userData.login,
                location: userData.location,
                });
        }
    } else {
        return res.redirect("/login");
    }
}

export const watch = (req, res) => {
    console.log(req.params);
    res.send("See user");
}