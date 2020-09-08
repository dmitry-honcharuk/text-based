import { DomainError } from './DomainError';

export class WrongDestinationError extends DomainError {
  constructor(direction: string) {
    super(`Wrong destination. ${direction}`);
  }
}
