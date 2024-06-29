import { AbstractValidation } from './AbstractValidation';
import { parseISO } from 'date-fns';

class DateRangeValidation extends AbstractValidation {
  public async validate(request: any): Promise<void> {
    const { startDate, endDate } = request;
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    if (parsedStartDate > parsedEndDate) {
      throw new Error("Start date cannot be after end date.");
    }

    await super.validate(request);
  }
}

export { DateRangeValidation };
