import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.get("/login", authController.getLogin);

export default router;
