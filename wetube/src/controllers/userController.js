export const join = (req, res) => res.send("Join");
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("Remove user");
export const login = (req, res) => res.send("User login");
export const logout = (req, res) => res.send("User logout");
export const watch = (req, res) => {
    console.log(req.params);
    res.send("See user");
}