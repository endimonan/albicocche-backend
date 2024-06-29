import mongoose from "mongoose";
import { Request, Response } from "express";
import { RecordService } from "../services/RecordService";

const recordService = new RecordService();

export class RecordController {
  static async addRecord(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new mongoose.Types.ObjectId(req.body.user.userId);

      const { date, activity, ateFruit, observation } = req.body;

      const points = recordService.calculatePoints(activity, ateFruit);

      const record = await recordService.addRecord(
        userId,
        date,
        activity,
        ateFruit,
        observation,
        points
      );

      if (!record) {
        return res.status(400).json({
          message:
            "Failed to add record. Please check if the date is in the correct format and if a record already exists for this date.",
        });
      }

      return res.status(201).json(record);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  static async getTotalPoints(req: Request, res: Response): Promise<Response> {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.userId);
      const totalPoints = await recordService.calculateTotalPoints(userId);
      return res.status(200).json({ totalPoints });
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}
