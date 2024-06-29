import Bet, { BetDocument } from "../models/Bet";
import { Types } from "mongoose";
import {
  BetLimitValidation,
  DateValidation,
  ParticipantValidation,
} from "../validations";

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

    const dateValidator = new DateValidation();
    const betLimitValidator = new BetLimitValidation();
    const participantValidator = new ParticipantValidation();

    dateValidator.setNext(betLimitValidator).setNext(participantValidator);

    await dateValidator.validate(request);

    const bet = new Bet({
      createdBy,
      participants: [createdBy, request.participantIds!],
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      award,
    });

    return await bet.save();
  }
}
