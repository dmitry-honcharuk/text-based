import { DomainError } from './DomainError';

export class CannotPerformActionError extends DomainError {
  constructor(message?: string) {
    super(message ?? 'Cannot Perform Action');
    Object.setPrototypeOf(this, CannotPerformActionError.prototype);
  }
}
