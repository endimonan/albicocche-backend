import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/verify-email", UserController.verifyEmail);

export default router;
