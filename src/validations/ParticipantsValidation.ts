import mongoose, { Types } from "mongoose";
import User from "../models/User";
import { AbstractValidation } from "./AbstractValidation";

class ParticipantValidation extends AbstractValidation {
  public async validate(request: any): Promise<void> {
    const { participantEmails } = request;
    const participantIds: Types.ObjectId[] = [];

    for (const email of participantEmails) {
      const user = await User.findOne({ email });
      if (!user || !mongoose.isValidObjectId(user._id)) {
        throw new Error(`User with email ${email} not found or has invalid ID`);
      }

      if (!participantIds.includes(user._id as Types.ObjectId)) {
        participantIds.push(user._id as Types.ObjectId);
      }
    }

    request.participantIds = participantIds;
    super.validate(request);
  }
}

export { ParticipantValidation };
