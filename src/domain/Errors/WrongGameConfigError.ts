import { DomainError } from './DomainError';

export class WrongGameConfigError extends DomainError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, WrongGameConfigError.prototype);
  }
}
