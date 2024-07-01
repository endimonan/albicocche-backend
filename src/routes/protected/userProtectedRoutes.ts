import { Router } from "express";
import { UserController } from "../../controllers/UserController";
import { UploadController } from "../../controllers/UploadController";
import upload from "../../config/multerConfig";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

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

router.post(
  "/upload",
  upload.single("file"),
  AuthMiddleware,
  UploadController.uploadFile
);

router.get("/profile", AuthMiddleware, UserController.profile);

export default router;
