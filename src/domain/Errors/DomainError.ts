/* istanbul ignore file */

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
