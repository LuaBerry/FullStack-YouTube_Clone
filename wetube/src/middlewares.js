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
    return res.redirect("/login");
}

export const publicPageMiddleware = (req, res, next) => {
    if(!req.session.loggedIn) {
        return next();
    }
    return res.redirect("/");
}