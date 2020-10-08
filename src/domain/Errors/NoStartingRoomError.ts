/* istanbul ignore file */

import { DomainError } from './DomainError';

export class NoStartingRoomError extends DomainError {
  constructor(gameId: string) {
    super(`No starting room in game map. (${gameId})`);
    Object.setPrototypeOf(this, NoStartingRoomError.prototype);
  }
}
