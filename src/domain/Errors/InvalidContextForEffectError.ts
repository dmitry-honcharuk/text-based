/* istanbul ignore file */

import { DomainError } from './DomainError';

export class NoObjectAttributeError extends DomainError {
  constructor(objectId: string, attributeName: string) {
    super(`Invalid context for given effect. (${objectId} - ${attributeName})`);
    Object.setPrototypeOf(this, NoObjectAttributeError.prototype);
  }
}
