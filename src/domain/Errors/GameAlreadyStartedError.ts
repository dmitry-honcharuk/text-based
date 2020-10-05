import { DomainError } from './DomainError';

export class GameAlreadyStartedError extends DomainError {
  constructor(gameId: string) {
    super(`The game is already started. (${gameId})`);
    Object.setPrototypeOf(this, GameAlreadyStartedError.prototype);
  }
}
