import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;

const app = express();

app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);



app.get("/", (req, res) => res.send("<h1>Home</h1>"));












const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);



app.listen(PORT, handleListening);