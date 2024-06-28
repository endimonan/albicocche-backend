import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/verify-email", UserController.verifyEmail);
router.put("/update", AuthMiddleware, UserController.update);
router.put(
  "/update-email-request",
  AuthMiddleware,
  UserController.updateEmailRequest
);
router.put(
  "/update-email-confirm",
  AuthMiddleware,
  UserController.updateEmailConfirm
);

export default router;
