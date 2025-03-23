import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

export default router;
