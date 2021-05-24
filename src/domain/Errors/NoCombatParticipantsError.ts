/* istanbul ignore file */

import { DomainError } from './DomainError';

export class NoCombatParticipantsError extends DomainError {
  constructor(roomId: string) {
    super(`No combat participants in room. (${roomId})`);
    Object.setPrototypeOf(this, NoCombatParticipantsError.prototype);
  }
}
