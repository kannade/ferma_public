import { Router } from "express";
import authController from "../../controllers/auth.controller";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/reset", authController.reset);
router.get("/reset-password/:token", authController.resetPasswordGet);
router.post("/reset-password/", authController.resetPasswordPost);

export default router;
