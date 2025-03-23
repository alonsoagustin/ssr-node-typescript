import path from "node:path";
import express from "express";
import morgan from "morgan";
import * as sessionManager from "./lib/sessionManager";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(sessionManager.createSession, sessionManager.setLocalsSession);
app.use("/auth", authRouter);

export default app;
