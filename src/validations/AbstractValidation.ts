export interface IValidation {
  setNext(validation: IValidation): IValidation;
  validate(request: any): Promise<void> | void;
}

export abstract class AbstractValidation implements IValidation {
  private nextValidation?: IValidation;

  public setNext(validation: IValidation): IValidation {
    this.nextValidation = validation;
    return validation;
  }

  public async validate(request: any): Promise<void> {
    if (this.nextValidation) {
      await this.nextValidation.validate(request);
    }
  }
}
