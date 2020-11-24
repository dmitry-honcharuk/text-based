/* istanbul ignore file */

import { DomainError } from './DomainError';

export class WrongTurnError extends DomainError {
  constructor() {
    super(`Move is out of turn.`);
    Object.setPrototypeOf(this, WrongTurnError.prototype);
  }
}
