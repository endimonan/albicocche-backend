import { AbstractValidation } from './AbstractValidation';
import { parseISO, isValid } from 'date-fns';

class DynamicDateValidation extends AbstractValidation {
  public async validate(request: any): Promise<void> {
    const dateFields = Object.keys(request).filter(key => key.toLowerCase().includes('date'));
    
    for (const field of dateFields) {
      const date = parseISO(request[field]);
      if (!isValid(date)) {
        throw new Error(`Invalid date format for field ${field}. Please use ISO 8601 format.`);
      }
    }

    await super.validate(request);
  }
}

export { DynamicDateValidation };
