/* istanbul ignore file */

import { DomainError } from './DomainError';

export class NoRoomError extends DomainError {
  constructor(roomId: string) {
    super(`Wrong room id. (${roomId})`);
    Object.setPrototypeOf(this, NoRoomError.prototype);
  }
}
