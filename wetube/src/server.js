import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({extended:true}));

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => res.send("<h1>Home</h1>"));

export default app;