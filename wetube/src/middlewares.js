import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.user = req.session.user || {};
    next();
}

export const privatePageMiddleware = (req, res, next) => {
    if(req.session.loggedIn) {
        return next();
    }
    req.flash("error", "Not authorized");
    return res.redirect("/login");
}

export const publicPageMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    }
    req.flash("error", "Not authorized");
    return res.redirect("/");
}

export const avatarUploadMiddleware = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 3000000,
    },
})

export const videoUploadMiddleware = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 300000000, 
    },
})