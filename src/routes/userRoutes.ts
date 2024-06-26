import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post("/register", UserController.register);
router.post("/verify-email", UserController.verifyEmail);

export default router;
