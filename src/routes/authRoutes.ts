import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.getLogout);

router.get("/signup", authController.getSignup);

export default router;
