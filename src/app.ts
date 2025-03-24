import express from "express";
import morgan from "morgan";
import * as sessionManager from "./lib/sessionManager";
import homeRouter from "./routes/homeRoutes";
import authRouter from "./routes/authRoutes";
import productsRouter from "./routes/productsRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(sessionManager.createSession, sessionManager.setLocalsSession);

app.get("/", homeRouter);
app.use("/products", sessionManager.requireAuth, productsRouter);
app.use("/auth", authRouter);

export default app;
