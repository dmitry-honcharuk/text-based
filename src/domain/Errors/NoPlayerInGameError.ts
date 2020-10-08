/* istanbul ignore file */

import { DomainError } from './DomainError';

export class NoPlayerInGameError extends DomainError {
  constructor(gameId: string, playerId: string) {
    super(`No player (${playerId}) in game (${gameId}).`);
    Object.setPrototypeOf(this, NoPlayerInGameError.prototype);
  }
}
