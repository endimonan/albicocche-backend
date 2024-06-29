import mongoose, { Document, Schema, Types } from "mongoose";

export interface BetDocument extends Document {
  createdBy: Types.ObjectId;
  participants: Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  award: string;
}

const BetSchema = new Schema<BetDocument>({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  award: { type: String, required: true },
});

const Bet = mongoose.model<BetDocument>("Bet", BetSchema);

export default Bet;
