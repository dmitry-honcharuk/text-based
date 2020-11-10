/* istanbul ignore file */

import { DomainError } from './DomainError';

export class UnknownCommandError extends DomainError {
  constructor(commmand: string) {
    super(`Unknown command. (${commmand})`);
    Object.setPrototypeOf(this, UnknownCommandError.prototype);
  }
}
