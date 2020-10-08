/* istanbul ignore file */

import { DomainError } from './DomainError';

export class GameIsNotStartedError extends DomainError {
  constructor(gameId: string) {
    super(`The game is not yet started. (${gameId})`);
    Object.setPrototypeOf(this, GameIsNotStartedError.prototype);
  }
}
