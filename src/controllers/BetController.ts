import { Request, Response } from "express";
import { BetService } from "../services/BetService";
import mongoose from "mongoose";

const betService = new BetService();

export class BetController {
  static async createBet(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user.userId);

      const { participants, startDate, endDate, award } = req.body;

      const bet = await betService.createBet(
        userId,
        participants,
        startDate,
        endDate,
        award
      );

      if (!bet) {
        return res.status(400).json({
          message: "Failed to create bet",
        });
      }

      return res.status(201).json(bet);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  static async getUserBets(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.userId);

      const bets = await betService.getUserBets(userId);

      if (!bets) {
        return res.status(404).json({
          message: "No bets found for this user",
        });
      }

      return res.status(200).json(bets);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
