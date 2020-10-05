import { DomainError } from './DomainError';

export class NoGameError extends DomainError {
  constructor(gameId: string) {
    super(`No game with given ID. (${gameId})`);
    Object.setPrototypeOf(this, NoGameError.prototype);
  }
}
