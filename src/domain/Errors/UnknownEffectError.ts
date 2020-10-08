/* istanbul ignore file */

import { DomainError } from './DomainError';

export class UnknownEffectError extends DomainError {
  constructor(effect: string) {
    super(`Unknown effect. (${effect})`);
    Object.setPrototypeOf(this, UnknownEffectError.prototype);
  }
}
