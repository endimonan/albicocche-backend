import Record, { RecordDocument } from "../models/Record";
import mongoose, { Types } from "mongoose";
import User from "../models/User";
import { parseISO, isValid, startOfDay, endOfDay } from "date-fns";

export class RecordService {
  async addRecord(
    userId: Types.ObjectId,
    date: string,
    activity: string,
    ateFruit: boolean,
    observation: string,
    points: number
  ): Promise<RecordDocument | null> {
    const parsedDate = parseISO(date);

    if (!isValid(parsedDate)) {
      console.error("Invalid date format. Please use ISO 8601 format.");
      return null;
    }

    if (parsedDate > new Date()) {
      console.error("Cannot add a record for a future date.");
      return null;
    }

    const startOfDayDate = startOfDay(parsedDate);
    const endOfDayDate = endOfDay(parsedDate);

    const existingRecord = await Record.findOne({
      userId,
      date: { $gte: startOfDayDate, $lte: endOfDayDate },
    });

    if (existingRecord) {
      console.error("Record already exists for this date.");
      return null;
    }

    const record = new Record({
      userId,
      date: parsedDate,
      activity,
      ateFruit,
      observation,
      points,
    });

    const savedRecord = await record.save();

    await User.findByIdAndUpdate(userId, {
      $push: { records: savedRecord._id },
    });

    return savedRecord;
  }

  public async calculateTotalPoints(
    userId: mongoose.Types.ObjectId
  ): Promise<number> {
    const records = await Record.find({ userId });
    const totalPoints = records.reduce((sum, record) => sum + record.points, 0);
    return totalPoints;
  }

  public calculatePoints(activity: string, ateFruit: boolean): number {
    let points = 0;
    switch (activity) {
      case "ALL":
        points += 3;
        break;
      case "GYM":
        points += 2;
        break;
      case "WATER":
        points += 1;
        break;
    }

    if (ateFruit) {
      points -= 1;
    }

    return points;
  }
}
