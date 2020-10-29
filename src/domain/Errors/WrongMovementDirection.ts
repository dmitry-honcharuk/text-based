/* istanbul ignore file */

import { DomainError } from './DomainError';

export class WrongMovementDirection extends DomainError {
  constructor(direction: string) {
    super(`Wrong direction. (${direction})`);
    Object.setPrototypeOf(this, WrongMovementDirection.prototype);
  }
}
