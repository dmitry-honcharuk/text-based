/* istanbul ignore file */

import { DomainError } from './DomainError';

export class NoPlayerRoomError extends DomainError {
  constructor(playerId: string) {
    super(`No player room. (${playerId})`);
    Object.setPrototypeOf(this, NoPlayerRoomError.prototype);
  }
}
