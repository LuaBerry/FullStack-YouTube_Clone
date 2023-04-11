import express from "express";

const PORT = 4000;

const app = express();

const middleWare = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}

app.get('/', (req, res) => {
    console.log("Hey!");
    return res.send("<h1>Are you surprised?</h1>");
});

const handleLogin = (req, res, next) => {
    return res.send("Login here.");
}
app.get("/login", middleWare, handleLogin)

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);