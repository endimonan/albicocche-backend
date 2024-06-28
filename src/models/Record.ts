import mongoose, { Document, Schema, Types } from "mongoose";

export interface RecordDocument extends Document {
  userId: Types.ObjectId;
  date: Date;
  activity: "ALL" | "GYM" | "WATER" | "NOT_ATTENDED" | "ABSENCE";
  ateFruit: boolean;
  observation: "WORK" | "LAZY" | "SICK" | "";
  points: number;
}

const RecordSchema = new Schema<RecordDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  activity: {
    type: String,
    enum: ["ALL", "GYM", "WATER", "NOT_ATTENDED", "ABSENCE"],
    required: true,
  },
  ateFruit: { type: Boolean, required: true },
  observation: {
    type: String,
    enum: ["WORK", "LAZY", "SICK", ""],
    default: "",
  },
  points: { type: Number, required: true },
});

const Record = mongoose.model<RecordDocument>("Record", RecordSchema);

export default Record;
