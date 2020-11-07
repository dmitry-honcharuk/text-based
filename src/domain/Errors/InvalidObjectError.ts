/* istanbul ignore file */

import { DomainError } from './DomainError';

export class InvalidObjectError extends DomainError {
  constructor(objectId: string) {
    super(`Invalid object. (${objectId})`);
    Object.setPrototypeOf(this, InvalidObjectError.prototype);
  }
}
