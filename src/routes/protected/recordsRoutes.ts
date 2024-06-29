import { Router } from "express";
import { RecordController } from "../../controllers/RecordController";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

router.post("/add", AuthMiddleware, RecordController.addRecord);

router.get(
  "/:userId/total-points",
  AuthMiddleware,
  RecordController.getTotalPoints
);

export default router;
