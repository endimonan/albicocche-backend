import Bet, { BetDocument } from "../models/Bet";
import mongoose, { Types } from "mongoose";
import User from "../models/User";
import Record from "../models/Record";
import {
  BetLimitValidation,
  DynamicDateValidation,
  ParticipantValidation,
} from "../validations";

interface BetDetails {
  id: string;
  createdBy: string;
  participants: {
    email: string;
    name: string;
    totalPoints: number;
  }[];
  startDate: string;
  endDate: string;
  award: string;
}

interface BetRequest {
  createdBy: Types.ObjectId;
  participantEmails: string[];
  startDate: string;
  endDate: string;
  award: string;
  participantIds?: Types.ObjectId[];
}

export class BetService {
  async createBet(
    createdBy: Types.ObjectId,
    participantEmails: string[],
    startDate: string,
    endDate: string,
    award: string
  ): Promise<BetDocument | null> {
    const request: BetRequest = {
      createdBy,
      participantEmails,
      startDate,
      endDate,
      award,
    };

    const dateValidator = new DynamicDateValidation();
    const betLimitValidator = new BetLimitValidation();
    const participantValidator = new ParticipantValidation();

    dateValidator.setNext(betLimitValidator).setNext(participantValidator);

    await dateValidator.validate(request);

    const participantIds: Types.ObjectId[] = [createdBy];

    for (const email of participantEmails) {
      const user = await User.findOne({ email });
      if (!user || !mongoose.isValidObjectId(user._id)) {
        throw new Error(`User with email ${email} not found or has invalid ID`);
      }

      if (!participantIds.includes(user._id as Types.ObjectId)) {
        participantIds.push(user._id as Types.ObjectId);
      }
    }

    const bet = new Bet({
      createdBy,
      participants: participantIds,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      award,
    });

    return await bet.save();
  }

  async getUserBets(userId: Types.ObjectId): Promise<any | null> {
    const bets = await Bet.find({ participants: userId })
      .populate("participants", "name email")
      .populate("createdBy", "name email");

    if (!bets || bets.length === 0) {
      return null;
    }

    const betDetails = await Promise.all(
      bets.map(async (bet) => {
        const participants = await Promise.all(
          bet.participants.map(async (participant: any) => {
            const totalPoints = await this.calculateTotalPoints(
              participant._id
            );
            return {
              name: participant.name,
              email: participant.email,
              totalPoints,
            };
          })
        );

        return {
          id: bet._id,
          createdBy: bet.createdBy,
          participants,
          startDate: bet.startDate,
          endDate: bet.endDate,
          award: bet.award,
        };
      })
    );

    return betDetails;
  }

  public async calculateTotalPoints(
    userId: mongoose.Types.ObjectId
  ): Promise<number> {
    const records = await Record.find({ userId });
    const totalPoints = records.reduce((sum, record) => sum + record.points, 0);
    return totalPoints;
  }
}
