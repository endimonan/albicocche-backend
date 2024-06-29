import { AbstractValidation } from "./AbstractValidation";
import { parseISO, isValid } from "date-fns";

class DateValidation extends AbstractValidation {
  public async validate(request: any): Promise<void> {
    const { startDate, endDate } = request;
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
      throw new Error("Invalid date format. Please use ISO 8601 format.");
    }

    if (parsedStartDate > parsedEndDate) {
      throw new Error("Start date cannot be after end date.");
    }

    await super.validate(request);
  }
}

export { DateValidation };
