import Record, { RecordDocument } from "../models/Record";
import mongoose, { Types } from "mongoose";
import User from "../models/User";

export class RecordService {
  async addRecord(
    userId: Types.ObjectId,
    date: Date,
    activity: string,
    ateFruit: boolean,
    observation: string,
    points: number
  ): Promise<RecordDocument | null> {
    if (date > new Date()) {
      console.error("Cannot add a record for a future date ");
      return null;
    }

    const existingRecord = await Record.findOne({
      userId,
      date: { $eq: date },
    });
    if (existingRecord) {
      console.error("Record already exists for this date.");
      return null;
    }

    const record = new Record({
      userId,
      date,
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
}
