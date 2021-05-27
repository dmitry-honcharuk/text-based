import { DomainError } from './DomainError';

export class CannotPerformActionError extends DomainError {
  static DEFAULT_MESSAGE = 'Cannot Perform Action';

  constructor(message?: string) {
    super(message ?? CannotPerformActionError.DEFAULT_MESSAGE);
    Object.setPrototypeOf(this, CannotPerformActionError.prototype);
  }
}
