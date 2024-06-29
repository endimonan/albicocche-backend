import { AbstractValidation } from "./AbstractValidation";
import Bet from "../models/Bet";

class BetLimitValidation extends AbstractValidation {
  public async validate(request: any): Promise<void> {
    const { createdBy } = request;
    const userBetsCount = await Bet.countDocuments({ createdBy });

    if (userBetsCount >= 5) {
      throw new Error("User cannot create more than 5 bets.");
    }

    await super.validate(request);
  }
}

export { BetLimitValidation };
