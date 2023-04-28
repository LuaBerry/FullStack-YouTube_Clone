import User from "../models/user";
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

    return res.render("", );
}

export const postEdit = (req, res) => {

    return res.render("", );
}

export const remove = (req, res) => {

    return res.render("", );
}
export const getLogin = (req, res) => {

    return res.render("login", {pageTitle: "Login"});
}

export const postLogin = async (req, res) => {
    const { username, password} = req.body;
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
export const watch = (req, res) => {
    console.log(req.params);
    res.send("See user");
}