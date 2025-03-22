import path from "node:path";
import express from "express";
import morgan from "morgan";
import authRouter from "./routes/authRoutes";
import { APPNAME, CONTACT } from "./config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.app = APPNAME;
app.locals.contact = CONTACT;

app.use("/auth", authRouter);

export default app;
