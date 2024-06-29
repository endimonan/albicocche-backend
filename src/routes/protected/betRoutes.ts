import { Router } from "express";
import { BetController } from "../../controllers/BetController";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

const router = Router();

router.post("/create", AuthMiddleware, BetController.createBet);
router.get("/:userId/bets", AuthMiddleware, BetController.getUserBets);

export default router;
